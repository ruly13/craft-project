Awesome. Here’s a **clean, copy-pasteable tutorial** to set up your workflow:

- One source repo: **`muatmuat-packages`** (owns `packages/ui`, `packages/hooks`, `packages/lib`)
- One consumer monorepo: **`muatrans`** (Turborepo)
- Strategy: create a **projection branch** in `muatmuat-packages` where the **repo root = the `packages/` folder**. Then mount that branch as a **single submodule** at `muatrans/packages`.

---

# Part 1 — Create the projection branch in `muatmuat-packages`

> Goal: a branch named `packages-root` whose tree looks like:
>
> ```
> (repo root)
> ├─ ui/
> ├─ hooks/
> └─ lib/
> ```
>
> i.e., it exposes **only** `packages/` from `main`, but as the repo root.

### 1) One-time setup (in `muatmuat-packages`)

```bash
# start from a clean main
git checkout main
git pull

# create the projection branch (first time)
git checkout -b packages-root
# rewrite the *current branch* so that 'packages/' becomes the repo root
git filter-repo --subdirectory-filter packages
# (If you don't have it: pip install git-filter-repo)

# publish it
git push -u origin packages-root
```

### 2) Add a refresh script (rebuilds `packages-root` whenever main changes)

Create **`scripts/refresh-packages-root.sh`** inside `muatmuat-packages`:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Ensure we run from repo root
cd "$(git rev-parse --show-toplevel)"

BASE_BRANCH="${1:-main}"
PROJECTION_BRANCH="${2:-packages-root}"
SUBDIR="packages"

echo "==> Updating $PROJECTION_BRANCH from $BASE_BRANCH ($SUBDIR/ as root)"

# Ensure base is up-to-date
git fetch origin "$BASE_BRANCH"
git checkout "$BASE_BRANCH"
git pull --ff-only origin "$BASE_BRANCH"

# Compute the split commit (subtree history where $SUBDIR is root)
SPLIT_SHA=$(git subtree split --prefix="$SUBDIR" "$BASE_BRANCH")
echo "==> Split SHA: $SPLIT_SHA"

# Move (force) the projection branch pointer to the new SHA
git branch -f "$PROJECTION_BRANCH" "$SPLIT_SHA"

# Push (force) to remote; expected for projection branches
git push -f origin "$PROJECTION_BRANCH"

echo "==> Done. $PROJECTION_BRANCH is now synced with $BASE_BRANCH:$SUBDIR/"
```

Make it executable:

```bash
chmod +x scripts/refresh-packages-root.sh
```

**Usage after you commit something to `main`:**

```bash
# from muatmuat-packages root
scripts/refresh-packages-root.sh
# or explicitly: scripts/refresh-packages-root.sh main packages-root
```

---

# Part 2 — Add the submodule into `muatrans` (from scratch)

> Goal: mount `muatmuat-packages`’s **`packages-root`** branch as a submodule at `muatrans/packages`.

### 1) Prepare the target path (in `muatrans`)

```bash
# from muatrans root
rm -rf packages     # ensure no conflicting local folder
git add -A
git commit -m "chore: prepare for packages submodule" || true
```

### 2) Add the submodule (track `packages-root` by default)

```bash
git submodule add -b packages-root git@github.com:YOUR_ORG/muatmuat-packages.git packages

# lock the tracking branch in .gitmodules (important for updates)
git config -f .gitmodules submodule.packages.branch packages-root
git submodule sync --recursive

git commit -m "chore: add packages submodule (packages-root branch)"
```

Your `muatrans` tree now shows:

```
muatrans/
├─ apps/
├─ packages/   # <— submodule pointing to muatmuat-packages:packages-root
│  ├─ ui/
│  ├─ hooks/
│  └─ lib/
├─ turbo.json
└─ package.json
```

---

# Part 3 — Working model (day-to-day)

### A) You changed code in **`muatmuat-packages`** and merged into `main`

1. Refresh the projection branch:

```bash
# in muatmuat-packages
scripts/refresh-packages-root.sh
```

2. Bump the submodule pointer in `muatrans`:

```bash
# in muatrans
git submodule update --remote packages   # uses .gitmodules branch = packages-root
git add packages
git commit -m "chore(packages): bump submodule to latest packages-root"
git push
```

### B) You changed code **inside `muatrans/packages`** (submodule) and want it upstream

```bash
# in muatrans
cd packages
git checkout -b feat/some-change
# edit files under ui/, hooks/, lib/
git add .
git commit -m "feat: some change"
git push origin feat/some-change
# open a PR in muatmuat-packages, merge into main

# then: refresh projection branch from the source repo
# (in muatmuat-packages)
scripts/refresh-packages-root.sh

# finally, bump the submodule pointer in muatrans
cd ../..    # back to muatrans root if needed
git submodule update --remote packages
git add packages
git commit -m "chore(packages): bump submodule after upstream merge"
git push
```

> You generally **don’t** commit directly to `packages-root`. Treat `main` as the source of truth, then regenerate `packages-root` via the script.

---

# Part 4 — Nice-to-have shortcuts

### Add npm scripts in `muatrans/package.json`

```json
{
  "scripts": {
    "pkgs:bump": "git submodule update --remote packages && git add packages && git commit -m \"chore(packages): bump submodule\" || true"
  }
}
```

Usage:

```bash
pnpm pkgs:bump && git push
```

### Add a Git alias (either repo)

Add to `~/.gitconfig`:

```ini
[alias]
  pkgs-refresh = "!f(){ scripts/refresh-packages-root.sh \"$@\"; }; f"
```

Usage (in `muatmuat-packages`):

```bash
git pkgs-refresh
```

### Optional: Auto-refresh projection on every `main` push (GitHub Actions)

Create **`muatmuat-packages/.github/workflows/packages-root.yml`**:

```yaml
name: Refresh packages-root
on:
  push:
    branches: [main]
jobs:
  refresh:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Git
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
      - name: Rebuild packages-root
        run: |
          bash scripts/refresh-packages-root.sh
```

Now your teammates only need to run `pnpm pkgs:bump` in `muatrans`.

---

# Part 5 — Sanity checks & troubleshooting

- **Verify submodule tracks the right branch**

  ```bash
  git config -f .gitmodules --get submodule.packages.branch
  # should print: packages-root
  ```

- **Clone with submodule (for new machines/CI)**

  ```bash
  git clone --recurse-submodules git@github.com:YOUR_ORG/muatrans.git
  # if already cloned:
  git submodule update --init --recursive
  ```

- **“Why do I need force push in the script?”**
  The projection branch is a **recomputed view** each time; its tip is rewritten, so `--force` (or `-f`) is expected.

- **Avoid renaming the mount path** (`muatrans/packages`) unless you also update `.gitmodules`.

- **Detached HEAD inside submodule?**

  ```
  cd packages
  git checkout packages-root
  git pull
  ```

---

## Copy-paste recap (the minimum you actually run)

**In `muatmuat-packages` (once):**

```bash
git checkout main && git pull
git checkout -b packages-root
git filter-repo --subdirectory-filter packages
git push -u origin packages-root
# add script 'scripts/refresh-packages-root.sh'
```

**Whenever `main` changes (source of truth):**

```bash
scripts/refresh-packages-root.sh
```

**In `muatrans` (once, from scratch):**

```bash
rm -rf packages
git submodule add -b packages-root git@github.com:YOUR_ORG/muatmuat-packages.git packages
git config -f .gitmodules submodule.packages.branch packages-root
git submodule sync --recursive
git commit -m "chore: add packages submodule"
```

**Pull latest into `muatrans`:**

```bash
git submodule update --remote packages
git add packages
git commit -m "chore(packages): bump submodule to latest packages-root"
git push
```

That’s the whole dance—short, predictable, and boring (the best kind of DevOps).

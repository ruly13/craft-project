# Tutorial Init Project

Habis clone silahkan run command2 ini:

1. Init Submodule

```bash
git submodule update --init --recursive
```

2. NPM Install

```bash
npm install
```

3. Jika ada update packages:

```bash
git submodule update --remote packages
git add packages
git commit -m "chore(packages): bump submodule to latest packages-root"
git push
```

# Sanity CORS Debugging Checklist

You stated you have fixed it, but the error `isNetworkError: true` persists. This definitely means the browser is still being blocked.

## 1. Check "Allow Credentials" (CRITICAL)

In Sanity Manage (CORS Origins):

- **Origin**: `http://localhost:3000`
- **Allow credentials**: **MUST BE CHECKED (✓)**.
- If it is unchecked, the login request (`/users/me`) will **FAIL** even if the origin is added.

## 2. Check Browser Extensions

- Turn off **AdBlock**, **uBlock Origin**, or **Privacy Badger** for `localhost:3000`.
- If you use **Brave Browser**, turn off "Shields".

## 3. Clear Cache

- Sometimes the browser remembers the "failed" CORS state.
- Try opening the page in **Incognito / Private Window**.

## 4. Verify Project ID

- Your Code uses: `2819wsin`
- Ensure this matches the project ID in your Sanity Dashboard URL: `sanity.io/manage/project/2819wsin/...`

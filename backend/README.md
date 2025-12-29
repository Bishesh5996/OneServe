# OneServe API (Backend)

Express API backed by MongoDB and Mongoose. This service powers authentication, products, orders, blogs, and user profiles (including avatars).

## Quick start
1) Copy env file and configure secrets:
```
cp backend/.env.example backend/.env
```
Set at least `MONGO_URI` and `JWT_SECRET`.

2) Install dependencies (from repo root):
```
npm install --workspaces
```

3) Run the API in dev mode:
```
npm run dev --workspace backend
```
The server listens on `PORT` (default `4000`) and connects to `MONGO_URI`.

## Seed helpers
- `src/scripts/ensure-admin-user.js` creates/updates the default admin. Adjust credentials before production.
- `src/scripts/seed.js` seeds products/blogs; run only if you need demo data.

## Notes on uploads
- Profile avatars are accepted as image uploads (data URLs) and stored on the user document. Validate/host them before a production release.

## Linting & testing
- There is no lint/test suite yet. Add ESLint/Jest before hardening for production.

# OneServe Monorepo

This repo contains the OneServe frontend (Vite + React + Tailwind) and backend (Express + MongoDB).

## Prerequisites
- Node.js 18+
- MongoDB running locally (or a connection string in `backend/.env`)

## Getting Started
1) Install dependencies for all workspaces:
```
npm install --workspaces
```

2) Set environment files:
- Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` and `JWT_SECRET`.
- Copy `frontend/.env.example` to `frontend/.env` if you need to point the frontend at a non-default API.

3) Run dev servers (from the repo root):
```
npm run dev
```
This runs both:
- Frontend at `http://localhost:5173`
- Backend API at `http://localhost:4000`

## Useful Scripts
- Frontend only: `npm run dev --workspace frontend`
- Backend only: `npm run dev --workspace backend`

## Notes
- Profile photos are accepted as uploaded images and stored with the user record.
- Admin credentials are seeded via `backend/src/scripts/ensure-admin-user.js` (update before production).

### Backend specifics
- API docs are in `backend/README.md` with setup, scripts, and upload notes.
- Default API port: `4000`. Configure `MONGO_URI` in `backend/.env`.

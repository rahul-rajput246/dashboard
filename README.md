# Smart Leads Dashboard

A complete MERN assignment build with:

- React + Vite + TypeScript + TailwindCSS frontend
- Node.js + Express + TypeScript backend
- MongoDB via `MONGO_URI`, plus a memory-server fallback for local development
- JWT authentication with bcrypt password hashing
- Role-based lead management with admin-only delete
- Search, filters, sort, pagination, CSV export, modals, loading states, and responsive UI

## Project Structure

```text
smart-leads-dashboard/
├── client/
├── server/
├── docker-compose.yml
└── README.md
```

## Features

- Login and registration
- JWT-protected API routes
- Default seeded admin user for local testing
- Create, read, update, and delete leads
- Debounced search by lead name or email
- Filter by status and source
- Sort by latest or oldest
- Pagination
- CSV export
- Responsive dashboard layout for desktop and mobile
- Docker support

## Default Admin

When the backend starts, it seeds this admin user if it does not already exist:

- Email: `admin@smartleads.local`
- Password: `Admin@123`

You can change these values in `server/.env`.

## Environment Variables

Create these files before running:

### `server/.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=replace-this-with-a-secure-secret
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@smartleads.local
ADMIN_PASSWORD=Admin@123
CLIENT_URL=http://localhost:5173
```

Notes:

- Leave `MONGO_URI` empty to use the built-in memory Mongo server locally.
- Add a real MongoDB Atlas URI if you want persistent cloud-backed storage.

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

### 1. Install dependencies

```bash
npm --prefix server install
npm --prefix client install
```

### 2. Start backend

```bash
npm --prefix server run dev
```

### 3. Start frontend

```bash
npm --prefix client run dev
```

Frontend runs at `http://localhost:5173` and backend runs at `http://localhost:5000`.

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Leads

- `GET /api/leads`
- `GET /api/leads/:id`
- `POST /api/leads`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id` (admin only)

## Docker

### Run with Docker Compose

```bash
docker compose up --build
```

This starts:

- MongoDB on `27017`
- Backend on `5000`
- Frontend on `5173`

## Build

```bash
npm run build
```

## Deploy to Render + Vercel

This repo is prepared for:

- Backend on Render
- Frontend on Vercel

Current docs I aligned with:

- Render Node/Express deploy docs: https://render.com/docs/deploy-node-express-app
- Render Blueprint reference: https://render.com/docs/blueprint-spec
- Render monorepo support: https://render.com/docs/monorepo-support
- Render health checks: https://render.com/docs/health-checks
- Vite on Vercel: https://vercel.com/docs/frameworks/frontend/vite
- Vercel environment variables: https://vercel.com/docs/projects/environment-variables
- Vercel rewrites: https://vercel.com/docs/rewrites

### 1. Deploy backend to Render

This repo includes [render.yaml](/c:/Users/Dell/dashboard/render.yaml), so the easiest path is:

1. Push this repo to GitHub.
2. In Render, click `New` -> `Blueprint`.
3. Connect the repo and deploy the blueprint.

Render will use:

- Root Directory: `server`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Before the first production deploy, set these environment variables in Render:

- `MONGO_URI`
- `ADMIN_PASSWORD`
- `CLIENT_URL`

Render will auto-generate:

- `JWT_SECRET`

Recommended values:

- `MONGO_URI`: your MongoDB Atlas connection string
- `ADMIN_PASSWORD`: a strong admin password
- `CLIENT_URL`: your Vercel production domain, such as `https://your-app.vercel.app`

Optional:

- `CLIENT_URLS`: comma-separated extra domains if you add a custom domain later
- `ALLOW_VERCEL_PREVIEWS=true`: keeps Vercel preview deployments working without adding each preview URL manually

### 2. Deploy frontend to Vercel

For Vercel:

1. Import the same GitHub repo.
2. Set `Root Directory` to `client`.
3. Let Vercel detect the framework as `Vite`.
4. Add this environment variable:

```env
VITE_API_URL=https://your-render-service.onrender.com/api
```

This repo also includes [client/vercel.json](/c:/Users/Dell/dashboard/client/vercel.json) so React Router routes like `/login` and `/register` resolve correctly on refresh.

### 3. Connect frontend and backend

After Vercel gives you your production URL:

1. Copy the frontend domain, for example `https://your-app.vercel.app`
2. In Render, set:

```env
CLIENT_URL=https://your-app.vercel.app
```

3. Redeploy the Render backend

If you keep `ALLOW_VERCEL_PREVIEWS=true`, preview deployments from Vercel will also be accepted by backend CORS.

### 4. Production checklist

- Use MongoDB Atlas instead of the memory server
- Change `ADMIN_PASSWORD`
- Confirm `JWT_SECRET` exists in Render
- Confirm Render health check passes at `/api/health`
- Confirm `VITE_API_URL` points to your Render backend
- Test login, register, create lead, edit lead, delete lead, filters, pagination, and CSV export

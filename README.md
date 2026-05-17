# Smart Leads Dashboard

Smart Leads Dashboard is a production-style MERN lead
management system built with TypeScript, JWT authentication, role-based access control, and responsive dashboard tools for managing customer leads efficiently.

## Project Overview

This project was built to match the assignment requirements while still feeling polished and production-aware. It includes:

- JWT-based authentication
- bcrypt password hashing
- role-based authorization
- full lead CRUD APIs
- search, filter, sort, and pagination
- CSV export
- responsive UI
- Docker support
- deployment-ready frontend and backend setup

## Live Deployment

- Frontend: `https://dashboard-omega-bice-60.vercel.app/`
- Backend: `https://smart-leads-dashboard-api.onrender.com`
- Health check: `https://smart-leads-dashboard-api.onrender.com/api/health`

## Features

### Authentication

- Register account
- Login account
- Persisted auth with protected routes
- Role support for `admin` and `sales`

### Lead Management

- Create lead
- Read leads list
- View single lead through API
- Edit lead
- Delete lead as admin only

### Dashboard Tools

- Debounced search by lead name or email
- Filter by lead status
- Filter by lead source
- Sort by latest or oldest
- Pagination
- CSV export
- Loading and empty states

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Zustand
- React Hook Form
- React CSV

### Backend

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- express-validator

## Project Structure

```text
smart-leads-dashboard/
|-- client/
|-- server/
|-- .env.example
`-- README.md
```

## Environment Variables

This repo includes:

- [server/.env.example](/C:/Users/Dell/dashboard/server/.env.example)
- [client/.env.example](/C:/Users/Dell/dashboard/client/.env.example)
- [.env.example](/C:/Users/Dell/dashboard/.env.example)

### Server

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_here
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@smartleads.local
ADMIN_PASSWORD=your_admin_password_here
CLIENT_URL=http://localhost:5173
CLIENT_URLS=
ALLOW_VERCEL_PREVIEWS=true
```

### Client

```env
VITE_API_URL=http://localhost:5000/api
```

## Demo Credentials

### Admin
Email: admin@example.com
Password: Rahul@2005

## Architecture

Client (React + Vite)
    ↓
REST API (Express + TypeScript)
    ↓
MongoDB Atlas

## Installation Steps

### 1. Install dependencies

```bash
npm --prefix server install
npm --prefix client install
```

### 2. Copy env files

Create:

- `server/.env`
- `client/.env`

using the included `.env.example` files.

### 3. Start backend

```bash
npm --prefix server run dev
```

### 4. Start frontend

```bash
npm --prefix client run dev
```

### 5. Open the app

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

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
- `DELETE /api/leads/:id`

### Utility

- `GET /api/health`

## Docker Setup

The project includes:

- [docker-compose.yml](/C:/Users/Dell/dashboard/docker-compose.yml)
- [server/Dockerfile](/C:/Users/Dell/dashboard/server/Dockerfile)

Run with:

```bash
docker compose up --build
```

## Deployment

### Frontend

- Vercel
- Config file: [client/vercel.json](/C:/Users/Dell/dashboard/client/vercel.json)

### Backend

- Render
- Blueprint file: [render.yaml](/C:/Users/Dell/dashboard/render.yaml)

## Screenshots

### Live Pages

- Login: `https://dashboard-omega-bice-60.vercel.app/login`
- Register: `https://dashboard-omega-bice-60.vercel.app/register`
- Dashboard: sign in from the login page to access the protected dashboard

## Assignment Checklist Match

- TypeScript everywhere
- JWT auth
- bcrypt password hashing
- CRUD APIs
- Filters
- Search
- Pagination
- CSV export
- Role-based access
- Docker setup
- Responsive UI
- Deployment
- README
- `.env.example`

## Notes

- The backend supports MongoDB Atlas for production use.
- Local development can still be configured separately based on your environment.
- Admin-only delete access is enforced on protected lead routes.

# Smart Leads Dashboard

Smart Leads Dashboard is a full-stack lead management application built with the MERN ecosystem. I designed it as the kind of internship project I would want to submit: practical, cleanly structured, and focused on solving a real business workflow instead of only showcasing UI.

The app helps a small sales team manage incoming leads, track pipeline status, search and filter records quickly, and export data when needed. It includes authentication, role-based permissions, responsive design, and deployment-ready configuration for modern hosting platforms.

## Why I Built This

For an internship-level project, I wanted something that demonstrates more than CRUD screens. This project highlights:

- full-stack product thinking from database to UI
- authentication and authorization
- clean API design with validation and error handling
- responsive frontend development
- deployment awareness with Docker, Render, and Vercel support

## Highlights

- JWT-based authentication with protected routes
- role-based access control with admin-only delete
- create, edit, view, and manage sales leads
- debounced search by name or email
- filter by lead status and source
- sort by latest or oldest
- pagination for scalable browsing
- CSV export for reporting and handoff workflows
- MongoDB support with an in-memory fallback for local development
- responsive dashboard experience for desktop and mobile

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Zustand
- React Hook Form
- Axios

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT
- bcrypt
- express-validator

## Project Structure

```text
dashboard/
|-- client/   # React frontend
|-- server/   # Express backend
|-- docker-compose.yml
|-- render.yaml
`-- README.md
```

## Core Features

### Authentication

- user registration and login
- JWT-protected API routes
- persisted auth flow for dashboard access

### Lead Management

- add new leads
- edit existing leads
- delete leads as admin
- track lead status and source

### Productivity Features

- debounced search
- filtering and sorting
- paginated listing
- CSV export

## API Overview

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Lead Routes

- `GET /api/leads`
- `GET /api/leads/:id`
- `POST /api/leads`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`

### Health Route

- `GET /api/health`

## Local Setup

### 1. Install dependencies

```bash
npm --prefix server install
npm --prefix client install
```

### 2. Create environment files

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://rahulrajput20112005_db_user:SmartLeads12345@cluster0.dcxhfyz.mongodb.net/smartleads?
JWT_SECRET=your_jwt_secret_here
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@smartleads.local
ADMIN_PASSWORD=Rahul@2005
CLIENT_URL=https://dashboard-omega-bice-60.vercel.app/
```

Create `client/.env`:

```env
VITE_API_URL=https://smart-leads-dashboard-api.onrender.com/api
```

Notes:

- if `MONGO_URI` is empty, the backend uses `mongodb-memory-server` for local development
- for persistent data, use a real MongoDB connection string

### 3. Run the backend

```bash
npm --prefix server run dev
```

### 4. Run the frontend

```bash
npm --prefix client run dev
```

Live App URLs:

- frontend: `https://dashboard-omega-bice-60.vercel.app/`
- backend: `https://smart-leads-dashboard-api.onrender.com`

Local Host App URLs:

- frontend: `http://localhost:5173`
- backend: `http://localhost:5000`

## Build

```bash
npm run build
```

## Docker

To run the full stack with Docker:

```bash
docker compose up --build
```

## Deployment

This repository is structured for:

- frontend deployment on Vercel
- backend deployment on Render

The included [render.yaml](/C:/Users/Dell/dashboard/render.yaml) and [client/vercel.json](/C:/Users/Dell/dashboard/client/vercel.json) help streamline deployment.

## What This Project Demonstrates

From an internship perspective, this project shows that I can:

- build a complete full-stack application
- organize code into maintainable frontend and backend layers
- handle auth, validation, and role-based permissions
- think about developer experience and deployment early
- ship a product that is both functional and presentable

## Future Improvements

- analytics widgets for conversion tracking
- activity history for lead updates
- unit and integration test coverage
- bulk lead import
- team assignment workflows

## Closing Note

If I were presenting this for an internship, I would describe it as a practical sales workflow dashboard built to show ownership across product design, API development, frontend implementation, and deployment readiness.

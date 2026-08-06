# Taskflow — Smart Task Management System

A responsive MERN task manager with task CRUD, completion tracking, priorities, categories, filtering/search, dashboard analytics, dark mode, due dates, and an AI-powered daily focus planner.

## Structure

```
client/                  # React/Vite client
  package.json           # Client-only dependencies and scripts
  src/components/        # Shared UI layout
  src/features/          # Feature modules (tasks, dashboard, AI)
  src/services/          # API client layer
server/
  package.json           # Server-only dependencies and scripts
  config/                # Database configuration
  controllers/           # Request handlers
  middleware/            # Shared Express middleware
  models/                # Mongoose models
  routes/                # API route definitions
```

## Start the interface

```bash
cd client
npm install
npm run dev
```

The interface works immediately with browser local storage, so a database is not required for the demo.

## Start the MongoDB API

Copy `server/.env.example` to `server/.env`, start MongoDB, then run:

```bash
cd server
npm install
npm run dev
```

The Express API exposes `GET`, `POST`, `PATCH`, and `DELETE` endpoints at `/api/tasks`.

## Authentication

The client includes sign-in, signup, logout, persistent sessions, and a guest mode for trying the interface without a backend.

For account authentication, run MongoDB and the server, copy `server/.env.example` to `server/.env`, and set a secure `JWT_SECRET`. The API provides:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Task API routes are JWT-protected and scoped to the authenticated user.

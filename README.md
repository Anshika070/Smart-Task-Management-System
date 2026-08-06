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

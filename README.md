# Taskflow — Smart Task Management System

A responsive MERN task manager with task CRUD, completion tracking, priorities, categories, filtering/search, dashboard analytics, dark mode, due dates, and an AI-powered daily focus planner.

## Start the interface

```bash
npm install
npm run dev
```

The interface works immediately with browser local storage, so a database is not required for the demo.

## Start the MongoDB API

Copy `.env.example` to `.env`, start MongoDB, then run `npm run server`.

The Express API exposes `GET`, `POST`, `PATCH`, and `DELETE` endpoints at `/api/tasks`.

# 🚀 TaskFlow AI – Smart Task Management System

TaskFlow AI is a modern full-stack MERN application that helps users manage their daily tasks efficiently using Artificial Intelligence.

Users can create, organize, track, and manage tasks while leveraging AI-powered voice input to automatically generate structured tasks from natural language.

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication
- Protected API Routes
- Persistent User Sessions

### ✅ Task Management
- Create, Edit & Delete Tasks
- Mark Tasks as Complete
- Categories
- Priority Levels
- Due Date & Time
- Task Search
- Task Filtering

### 🤖 AI Features
- 🎤 Voice-to-Task Creation
- Speech Recognition using Browser API
- Google Gemini Integration
- AI automatically extracts:
  - Task Name
  - Description
  - Category
  - Priority
  - Due Date
  - Time
- Auto-fill Task Form using Natural Language

Example:

User says:

> "Finish Docker project tomorrow at 7 PM with high priority."

AI generates:

- Task Name: Finish Docker Project
- Description: Finish Docker project tomorrow at 7 PM with high priority.
- Category: Work
- Priority: High
- Due Date: Tomorrow
- Time: 19:00

### 📊 Dashboard
- Total Tasks
- Completed Tasks
- Pending Tasks
- Task Statistics
- Progress Overview

### 🎨 UI/UX
- Responsive Design
- Dark / Light Theme
- Modern Dashboard
- Clean User Experience

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- React Router
- CSS
- Lucide React
- React Speech Recognition

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Gemini API

---

# 📁 Project Structure

```
TaskFlow-AI
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── AppLayout.css
│   │   │   └── AppLayout.jsx
│   │   │
│   │   ├── features
│   │   │   ├── ai
│   │   │   │   ├── AiPlanner.jsx
│   │   │   │   └── VoiceRecorder.jsx
│   │   │   │
│   │   │   ├── auth
│   │   │   │   ├── authContext.jsx
│   │   │   │   ├── AuthScreen.jsx
│   │   │   │   └── AuthSummary.jsx
│   │   │   │
│   │   │   ├── categories
│   │   │   │   ├── CategoryOverview.css
│   │   │   │   └── CategoryOverview.jsx
│   │   │   │
│   │   │   ├── dashboard
│   │   │   │   └── Stats.jsx
│   │   │   │
│   │   │   └── tasks
│   │   │       ├── TaskCard.css
│   │   │       ├── TaskCard.jsx
│   │   │       ├── TaskFormModal.jsx
│   │   │       ├── taskHelpers.js
│   │   │       └── taskUtils.js
│   │   │
│   │   ├── services
│   │   │   ├── aiService.js
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   │
│   │   ├── styles
│   │   ├── globals.css
│   │   ├── theme.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.html
│   │
│   ├── package.json
│   └── package-lock.json
│
├── server
│   ├── config
│   │   └── database.js
│   │
│   ├── controllers
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models
│   │   ├── Task.js
│   │   └── User.js
│   │
│   ├── routes
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── services
│   │   └── geminiService.js
│   │
│   ├── .env
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd YOUR_REPOSITORY
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create a `.env` file inside **client**

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

---

## Tasks

```
GET /api/tasks

POST /api/tasks

PATCH /api/tasks/:id

DELETE /api/tasks/:id
```

---

## AI

```
POST /api/ai/extract-task
```

Example Request

```json
{
    "text":"Finish Docker project tomorrow at 7 PM with high priority."
}
```

Example Response

```json
{
    "title":"Finish Docker project",
    "description":"Finish Docker project tomorrow at 7 PM with high priority.",
    "category":"Work",
    "priority":"High",
    "dueDate":"2026-08-08",
    "time":"19:00"
}
```

---

# 🚀 Future Improvements

- AI Task Recommendations
- Smart Daily Planner
- AI Task Prioritization
- Email Notifications
- Calendar Integration
- Recurring Tasks
- OCR Task Creation
- File Attachments
- Team Collaboration


-------

# 👨‍💻 Author

**Kumari Anshika**

GitHub:
https://github.com/Anshika070
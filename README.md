# TaskMaster

A simple full-stack Todo List application built for learning Node.js, Express, and vanilla JavaScript.

---

## Overview

TaskMaster is a dashboard-style todo app where you can create tasks, organize them by category, set priorities and due dates, and mark them as complete.

This project is intentionally kept simple so you can focus on learning how a frontend, backend, and JSON storage work together.

---

## Features

- [ ] Add, view, and delete tasks
- [ ] Set priority (low, medium, high)
- [ ] Set due dates
- [ ] Organize tasks by category
- [ ] Mark tasks as completed
- [ ] Dark mode support
- [ ] Responsive sidebar

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML, Tailwind CSS, vanilla JavaScript |
| Backend | Node.js, Express |
| Storage | JSON files |

---

## Project Structure

```
Todo-List/
├── api/                    # Backend
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── data/               # JSON storage files
│   ├── src/
│   │   ├── controllers/    # Request/response handlers
│   │   ├── models/         # JSON file read/write
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic and validation
│   │   └── middleware/     # Error handling, etc.
│   └── 
├── web/                    # Frontend
│   ├── index.html          # Main page
│   ├── src/
│   │   ├── api/            # Backend API calls
│   │   ├── components/     # UI components
│   │   ├── services/       # Frontend business logic
│   │   ├── utils/          # Helpers
│   │   └── styles/         # Custom styles
│   └── script.js           # Old single-file script (reference)
├── DESIGN.md               # Full application design
└── README.md
```

---

## Getting Started

### 1. Clone or open the project

```bash
cd Todo-List
```

### 2. Start the backend

```bash
cd api
npm install
npm run dev
```

The backend runs at:

```text
http://localhost:3000
```

### 3. Start the frontend

Open a new terminal:

```bash
cd web
npx serve .
```

Then open the URL shown in your terminal, for example:

```text
http://localhost:3001
```

> Note: The frontend needs a static file server because it uses ES modules.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle completion |
| `GET` | `/api/categories` | Get all categories |
| `POST` | `/api/categories` | Create a category |
| `DELETE` | `/api/categories/:id` | Delete a category |

See `api/BACKEND.md` for full API documentation.

---

## Documentation

- [`DESIGN.md`](./DESIGN.md) — Application architecture, data models, and design decisions
- [`api/BACKEND.md`](./api/BACKEND.md) — Backend structure and API details

---

## Learning Goals

This project helps you practice:

- Building an Express API with routes, controllers, services, and models
- Reading and writing JSON files with `fs/promises`
- Using vanilla JavaScript ES modules in the browser
- Fetching data from a backend API
- Separating frontend code into components and services
- Handling CORS between frontend and backend

---

## License

ISC

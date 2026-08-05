# TaskMaster

A full-stack todo dashboard built with Node.js, Express, Tailwind CSS, and vanilla JavaScript.

## Overview

TaskMaster lets you create, edit, organize, search, sort, complete, and delete tasks. Tasks are stored in JSON files through a small Express API, while the frontend uses ES modules with a layered vanilla JavaScript architecture.

## Features

- [x] Add, view, edit, and delete tasks
- [x] Set priority: low, medium, or high
- [x] Set due dates
- [x] Organize tasks by category
- [x] Add, select, and delete categories
- [x] Mark tasks as completed
- [x] Search tasks by title
- [x] Sort tasks by date, priority, or title
- [x] Today, upcoming, and completed task views
- [x] Dark mode support
- [x] Responsive sidebar

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, Tailwind CSS, vanilla JavaScript ES modules |
| Backend | Node.js, Express |
| Storage | JSON files |

## Project Structure

```text
Todo-List/
|-- api/
|   |-- app.js
|   |-- server.js
|   |-- data/
|   |   |-- categories.json
|   |   `-- tasks.json
|   `-- src/
|       |-- controllers/
|       |-- middleware/
|       |-- models/
|       |-- routes/
|       |-- services/
|       `-- utils/
|-- web/
|   |-- index.html
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- services/
|   |   |-- ui/
|   |   `-- utils/
|   `-- dist/
`-- README.md
```

## Getting Started

### 1. Install dependencies

```bash
cd api
npm install

cd ../web
npm install
```

### 2. Start the backend

```bash
cd api
npm run dev
```

The backend runs at:

```text
http://localhost:3001
```

### 3. Build frontend CSS

```bash
cd web
npm run build:css
```

### 4. Start the frontend

The frontend must be served from a static server because it uses ES modules.

```bash
cd web
npx serve .
```

Open the URL printed by the server. If you use Python instead:

```bash
cd web
python -m http.server 3002
```

Then open:

```text
http://localhost:3002/index.html
```

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/:id` | Get one task |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |
| `GET` | `/api/categories` | Get all categories |
| `GET` | `/api/categories/:id` | Get one category |
| `POST` | `/api/categories` | Create a category |
| `PUT` | `/api/categories/:id` | Update a category |
| `DELETE` | `/api/categories/:id` | Delete a category |

## Verification

Run the backend tests:

```bash
cd api
node --test
```

Build the frontend CSS:

```bash
cd web
npm run build:css
```

## Learning Goals

- Build an Express API with routes, controllers, services, models, and middleware
- Persist data using JSON files and `fs/promises`
- Use vanilla JavaScript ES modules in the browser
- Keep frontend API, service, component, UI, and utility layers separated
- Handle CORS between a static frontend and local backend API

## License

ISC

# Todo-List Web Frontend — Implementation Plan

## Goal

Refactor the vanilla JS frontend into a clean, layered architecture so each file has one clear responsibility, the dependency direction is strict, and the code is easy to test and extend.

## Current State

- `src/main.js` — only wires theme toggle + sidebar; everything else is missing.
- `src/ui/theme.js`, `src/ui/sidebar.js` — working, keep.
- `src/api/client.js` — working fetch wrapper, weak error handling.
- `src/api/tasks.api.js` — only `getPendingTasks()`, no full CRUD.
- `src/api/categories.api.js`, `src/services/*.js`, `src/components/*.js`, `src/utils/dom.js` — empty.
- `src/utils/helpers.js` — only `formatDate()`.
- `index.html` — static markup + one inline `onclick` (Add Task button).

## Core Principle

Layered separation with a strict dependency direction — each layer may only use the layers below it:

```
main.js (bootstrap / wiring only)
   -> ui/            (standalone widgets: theme, sidebar)
   -> components/    (DOM rendering + event handling)
   -> services/      (business logic, validation, orchestration)
   -> api/           (HTTP layer, one function per endpoint)
   -> utils/         (pure helpers — no DOM, no fetch)
```

Rules that keep it clean:

1. `api/` never touches the DOM.
2. `components/` never calls `api/` directly — always through `services/`.
3. `utils/` is 100% pure and testable (no `document`, no `fetch`).
4. Components render only one thing; one function per responsibility.
5. `main.js` contains only wiring, never logic.

## Naming Conventions

| Prefix     | Meaning                          | Example                              |
| ---------- | -------------------------------- | ------------------------------------ |
| `create*`  | Returns a DOM element            | `createTaskItem(task)`               |
| `render*`  | Paints into a container          | `renderTasks(container, tasks)`      |
| `init*`    | Sets up event listeners          | `initTaskForm(modal)`                |
| `handle*`  | Event callback                   | `handleSubmit(e)`                    |
| `get*`/`load*` | Data fetching                | `loadTasks()`, `getTaskById(id)`     |

---

## Task Breakdown

### 1. `src/utils/helpers.js` — pure logic, no DOM/API

- Keep `formatDate(dateInput, locale)`.
- Add `escapeHtml(text)` — escape user input before injecting into HTML.
- Add `validateTask(data)` — title required; default date/priority if missing; return `{ isValid, errors }`.
- Add `sortTasks(tasks, by)` — sort by date/priority/title.
- Add `filterTasks(tasks, { category, priority })` — filter by category and/or priority.

### 2. `src/utils/dom.js` — DOM utilities

- `qs(selector)` / `qsAll(selector)` — shorthand for `querySelector`/`querySelectorAll`.
- `createEl(tag, className, text)` — create element with optional class + text.
- `showError(element, message)` / `clearErrors(container)` — for the `.error-msg` spans in the modal.
- `openModal(modal)` / `closeModal(modal)` — toggle `hidden` class.
- `debounce(fn, ms)` — for the search input.

### 3. `src/api/tasks.api.js` — one thin function per backend route

Match backend `GET/POST/PUT/DELETE /api/tasks`:

- `getTasks()`
- `getTaskById(id)`
- `createTask(data)`
- `updateTask(id, data)`
- `deleteTask(id)`

Remove `getPendingTasks()` in favor of the generic set.

### 4. `src/api/categories.api.js` — mirror of backend `/api/categories`

- `getCategories()`
- `getCategory(id)`
- `createCategory(data)`
- `updateCategory(id, data)`
- `deleteCategory(id)`

### 5. `src/api/client.js` — improve error handling

- Parse the response body on error and throw `Error(message)` with a readable message.
- Keep automatic JSON stringify of plain objects; keep support for `FormData`.

### 6. `src/services/tasks.service.js` — business rules, calls the API layer

- `loadTasks()` — fetch, validate, return normalized list.
- `createTask(input)` — validate → transform payload → call `api.createTask`.
- `updateTask(id, changes)` — e.g. toggle complete / edit title.
- `toggleTaskComplete(task)` — convenience wrapper around `updateTask`.
- `deleteTask(id)`.
- `groupTasks(tasks)` — return `{ pending: [], completed: [] }` to feed both lists.

### 7. `src/services/categories.service.js`

- `loadCategories()`.
- `addCategory(name)` — validate name, call `api.createCategory`.
- `deleteCategory(id)`.

### 8. `src/components/TaskItem.js` — renders ONE task

- `createTaskItem(task, { onToggle, onEdit, onDelete })` — returns an `<li>` element.
- `buildTaskMarkup(task)` — HTML string, using `escapeHtml` for any user data.

### 9. `src/components/TaskList.js` — renders lists, no fetching

- `renderPending(container, tasks, handlers)` — fills `#taskList`.
- `renderCompleted(container, tasks, handlers)` — fills `#completedList`.
- `updateCompletedBadge(count)` — fills the empty `<span>` badge.

### 10. `src/components/TaskForm.js` — modal form only

- `initTaskForm(modal, { onSave })` — wire `#taskForm` submit + cancel buttons.
- `handleSubmit(e)` — read fields → validate → call service → close modal → refresh list.

### 11. `src/components/CategoryList.js` — sidebar categories only

- `renderCategories(container, categories)` — fills `#categoryContainer`.
- `initCategoryInput()` — wire `#categoryBtn` + `#categoryInput` add-category flow.

### 12. `src/components/Modal.js` — generic modal behavior

- `initModal(modal)` — backdrop click, Escape key closes, `open`/`close` helpers.

### 13. `src/ui/theme.js` — no change (already clean).

### 14. `src/ui/sidebar.js` — minor cleanup

- Rename `toggleSideBar` → `toggleSidebar` for consistency.
- Otherwise keep as-is.

### 15. `src/main.js` — wiring only

```js
initApp():
  initSidebar()
  initModal(addTaskModal)
  initTaskForm(addTaskModal, { onSave: refresh })
  initCategoryInput()
  loadAndRenderTasks()
  loadAndRenderCategories()
```

### 16. `index.html` — remove inline JS

- Replace the inline `onclick` on the Add Task button with an `addEventListener` in `initModal`/`main.js`.

### 17. `src/input.css` — fix stale source path

- `@source "../script.js"` references a file that does not exist; change to `../src/main.js`.

---

## Suggested Implementation Order

1. `utils/` (pure helpers first — everything depends on them)
2. `api/` (client.js improvements + tasks.api.js + categories.api.js)
3. `services/`
4. `components/`
5. `main.js` + `index.html` + `input.css` wiring/fixes
6. Manual verification in browser against the running backend (`npm run dev` + API on `http://localhost:3001/api`)

## Verification

- `npm run build:css` produces `dist/output.css` with no errors.
- Open `index.html` in the browser; tasks and categories load from the API.
- Add/edit/delete/toggle tasks and categories work end to end.
- Dark/light theme toggle and sidebar still work on desktop and mobile.

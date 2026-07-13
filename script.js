/**
 * DOM Selector
 */
const html = document.documentElement;
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("sidebarBackdrop");

// Buttons
const themeToggleBtn = document.getElementById("themeToggle");
const sidebarToggleBtn = document.getElementById("sidebarToggle");
const toggelCompletedBtn = document.getElementById("toggleCompleted");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const addTaskModal = document.getElementById("addTaskModal");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");

//Container and component
const completedTasksContainer = document.getElementById("completedList");
const completedArrow = document.getElementById("completedArrow");

/**
 * UI State
 */
let isSidebarOpen = localStorage.getItem("sidebarState") === "true";
let theme = localStorage.getItem("theme") || "light";
let isMobileView = window.innerWidth < 1024;
let isCompletedListOpen = true;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/**
 * Initialize theme and sidebar
 */
function initTheme() {
  html.classList.toggle("dark", theme === "dark");
}

function initSidebar() {
  if (isSidebarOpen) {
    if (isMobileView) {
      backdrop.classList.remove("hidden");
      sidebar.classList.remove("-translate-x-full");
    } else {
      backdrop.classList.add("hidden");
      sidebar.classList.remove("-translate-x-full");
    }
  } else {
    backdrop.classList.add("hidden");
    sidebar.classList.add("-translate-x-full");
  }
}

function sidebarToggle() {
  isSidebarOpen = !isSidebarOpen;
  localStorage.setItem("sidebarState", isSidebarOpen);
  initSidebar();
}

function themeToggle() {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  initTheme();
}

function completeListToggle() {
  isCompletedListOpen = !isCompletedListOpen;
  if (!isCompletedListOpen) {
    completedTasksContainer.classList.add('hidden');
    completedArrow.classList.replace('ph-caret-down', 'ph-caret-up');
  } else {
    completedTasksContainer.classList.remove('hidden');
    completedArrow.classList.replace('ph-caret-up', 'ph-caret-down');
  }
}

/**
 * Task Modal and CRUD Logic
 */
const taskForm = document.getElementById("taskForm");

function openModal() {
  addTaskModal.classList.remove("hidden");
  taskForm.reset();
}

function closeModal() {
  addTaskModal.classList.add("hidden");
  taskForm.reset();
}

function addTask() {
  //Input fields
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const priority = document.getElementById("priority").value.trim();
  const category = document.getElementById("category").value.trim();
  const task = {
    id: crypto.randomUUID(),
    title: title,
    date: date,
    priority: priority,
    category: category,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  return task;
}

function validateForm() {
  const title = document.getElementById("title").value.trim();
  const date = document.getElementById("date").value;
  const priority = document.getElementById("priority").value.trim();
  const category = document.getElementById("category").value.trim();

  const errors = [];
  console.log(errors);
  if (!title) {
    errors.push({
      valid: false,
      element: document.getElementById("title"),
      message: "Title is required.",
    });
  }
  if (!date) {
    errors.push({
      valid: false,
      element: document.getElementById("date"),
      message: "Date is required.",
    });
  }
  if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
    errors.push({
      valid: false,
      element: document.getElementById("date"),
      message: "Date cannot be in the past.",
    });
  }
  if (!priority) {
    errors.push({
      valid: false,
      element: document.getElementById("priority"),
      message: "Priority is required.",
    });
  }
  if (!category) {
    errors.push({
      valid: false,
      element: document.getElementById("category"),
      message: "Category is required.",
    });
  }

  return { valid: errors.length === 0, errors };
}

function getTaskById(taskId) {
  return tasks.find((t) => t.id === taskId);
}

function showError(errors) {
  errors.forEach((err) => {
    const errorContainer =
      err.element.parentElement.querySelector(".error-msg");
    if (errorContainer) {
      errorContainer.textContent = err.message;
    }
  });
}

function clearErrors() {
  const errorContainers = document.querySelectorAll(".error-msg");
  errorContainers.forEach((container) => {
    container.textContent = "";
  });
}

//Save task to local storage
function saveTask(task) {
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  closeModal();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleCompletedStatus(taskId) {
  const task = getTaskById(taskId);
  if (task) {
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  return task;
}

function renderTasks() {
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const tasksContainer = document.getElementById("taskList");
  const completedTasksContainer = document.getElementById("completedList");
  tasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";
  pendingTasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className =
      "group mb-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark hover:border-primary hover:shadow-md transition-all duration-200";
    li.innerHTML = `<div class="flex gap-4 p-4">
                            <!-- Checkbox -->
                            <div class="pt-1">
                                <input
                                type="checkbox" ${task.completed ? "checked" : ""}
                                class="${task.completed ? "bg-primary border-primary" : "border-gray-300"} h-5 w-5 rounded text-primary focus:ring-primary">
                            </div>

                            <!-- Content -->
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <div class="flex flex-wrap items-center gap-2">
                                            <h3
                                            class="font-semibold text-gray-900 dark:text-white">
                                                ${task.title}
                                            </h3>
                                            <span
                                            class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium ${task.priority === "high" ? "text-red-800" : task.priority === "medium" ? "text-yellow-800" : "text-green-800"}">
                                                ${task.priority}
                                            </span>
                                        </div>
                                        <div
                                        class="mt-5 flex flex-wrap gap-4 text-xs text-gray-500">
                                            <span class="flex items-center gap-1">
                                                <i class="ph ph-briefcase"></i>
                                                ${task.category}
                                            </span>
                                            <span class="flex items-center gap-1">
                                                <i class="ph ph-calendar"></i>
                                                ${task.date}
                                            </span>
                                            <span class="flex items-center gap-1">
                                                <i class="ph ph-clock"></i>
                                                ${task.createdAt}
                                            </span>
                                        </div>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <button class="delete-btn rounded-lg p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <i class="ph ph-trash"></i>
                                        </button>
                                        <button class="delete-btn rounded-lg p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <i class="ph ph-pencil"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </li>`;
    tasksContainer.appendChild(li);
  });
  console.log(completedTasks)
  completedTasks.forEach(completedTask => {
    const li = document.createElement("li");
    li.setAttribute("data-id", completedTask.id);
    li.className =
      "flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3";
    li.innerHTML = `
                <div class="flex items-center gap-3">
                  <input
                    type="checkbox"
                    ${completedTask.completed ? "checked" : ""}
                    class="h-5 w-5 rounded text-primary focus:ring-primary"
                  />

                  <div>
                    <p class="line-through text-gray-400">
                      ${completedTask.title}
                    </p>
                  </div>
                </div>

                <button class="delete-btn text-gray-400 hover:text-red-500">
                  <i class="ph ph-trash"></i>
                </button>
              </li>`;
    completedTasksContainer.appendChild(li);
  })


}

//Event listeners
themeToggleBtn.addEventListener("click", themeToggle);
sidebarToggleBtn.addEventListener("click", sidebarToggle);
backdrop.addEventListener("click", sidebarToggle);
toggelCompletedBtn.addEventListener("click", completeListToggle);
cancelTaskBtn.addEventListener("click", closeModal);
window.addEventListener("resize", () => {
  isMobileView = window.innerWidth < 1024;
  initSidebar();
});
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const validation = validateForm();
  if (!validation.valid) {
    showError(validation.errors);
    return;
  }
  clearErrors();
  let task = addTask();
  saveTask(task);
  renderTasks();
});
document.addEventListener("click", (event) => {
  const target = event.target;
  const listItem = target.closest("li[data-id]");
  if (!listItem) return;

  const taskId = listItem.getAttribute("data-id");

  if (target.type === "checkbox") {
    console.log(taskId);
    toggleCompletedStatus(taskId);
    renderTasks();
  } else if (target.closest(".delete-btn")) {
    deleteTask(taskId);
    renderTasks();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  initTheme();
  initSidebar();
});

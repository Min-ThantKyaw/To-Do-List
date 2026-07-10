const themeToggleBtn = document.getElementById('themeToggle');
const sidebarToggleBtn = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebarBackdrop');
const html = document.documentElement;

//UI state
let isSidebarOpen = localStorage.getItem('sidebarState') === 'true';
let theme = localStorage.getItem('theme') || 'light';
let isMobileView = window.innerWidth < 1024;

//Initialize theme and sidebar
function initTheme() {
    html.classList.toggle('dark', theme === 'dark');
}

//Initialize sidebar
function initSidebar() {
    if (isSidebarOpen) {
        if (isMobileView) {
            backdrop.classList.remove('hidden');
            sidebar.classList.remove('-translate-x-full');
        } else {
            backdrop.classList.add('hidden');
            sidebar.classList.remove('-translate-x-full');
        }
    } else {
        backdrop.classList.add('hidden');
        sidebar.classList.add('-translate-x-full');
    }
}

//Toggle sidebar
function sidebarToggle() {
    isSidebarOpen = !isSidebarOpen;
    localStorage.setItem('sidebarState', isSidebarOpen);
    initSidebar();
}

//Toggle theme
function themeToggle() {
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    initTheme();
}

//Event listeners
themeToggleBtn.addEventListener('click', themeToggle);
sidebarToggleBtn.addEventListener('click', sidebarToggle);
backdrop.addEventListener('click', sidebarToggle);
window.addEventListener('resize', () => {
    isMobileView = window.innerWidth < 1024;
    initSidebar();
});

//Initialize theme and sidebar
initTheme();
initSidebar();

//Task Modal


//Add Tasks
const taskForm = document.getElementById('taskForm');

//Add Task button
const saveTaskBtn = document.getElementById('saveTaskBtn');
const addTaskModal = document.getElementById('addTaskModal');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function openModal() {
    addTaskModal.classList.remove('hidden');
    taskForm.reset();
}

function closeModal() {
    addTaskModal.classList.add('hidden');
    taskForm.reset();
}

function addTask() {
    //Input fields
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value.trim();
    const category = document.getElementById('category').value.trim();
    const task = {
        id: crypto.randomUUID(),
        title: title.charAt(0).toUpperCase() + title.slice(1),
        date: date,
        priority: priority.charAt(0).toUpperCase() + priority.slice(1),
        category: category.charAt(0).toUpperCase() + category.slice(1),
        completed: false,
        createdAt: new Date().toISOString(),
    };

    return task;
}

function validateForm() {
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value.trim();
    const category = document.getElementById('category').value.trim();

    const errors = [];
    console.log(errors);
    if (!title) {
        errors.push({ valid: false, element: document.getElementById('title'), message: 'Title is required.' });
    }
    if (!date) {
        errors.push({ valid: false, element: document.getElementById('date'), message: 'Date is required.' });
    }
    if (new Date(date) < new Date().setHours(0, 0, 0, 0)) {
        errors.push({ valid: false, element: document.getElementById('date'), message: 'Date cannot be in the past.' });
    }
    if (!priority) {
        errors.push({ valid: false, element: document.getElementById('priority'), message: 'Priority is required.' });
    }
    if (!category) {
        errors.push({ valid: false, element: document.getElementById('category'), message: 'Category is required.' });
    }

    return { valid: errors.length === 0, errors };
}
function getTaskById(taskId) { 
    return tasks.find(t => t.id === taskId);
}

function showError(errors) {
    errors.forEach((err) => {
        const errorContainer = err.element.parentElement.querySelector('.error-msg');
        if (errorContainer) {
            errorContainer.textContent = err.message;
        }
    });
}

function clearErrors() {
    const errorContainers = document.querySelectorAll('.error-msg');
    errorContainers.forEach(container => {
        container.textContent = '';
    });
}

//Save task to local storage
function saveTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    closeModal();
}

function toggleCompletedStatus(taskId) { 
    const task = getTaskById(taskId);
    if (task) { 
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return task;
}

function handleCompleteTaskUi(taskId) { 
    const task = getTaskById(taskId);
    if (task) { 
        const taskElement = document.querySelector(`li[data-id="${taskId}"]`);
        const titleElement = taskElement.querySelector('h3');
        if (task.completed) { 
            titleElement.classList.add('line-through', 'text-red-400');
        } else {
            titleElement.classList.remove('line-through', 'text-red-400');
        }
    }
    }


function renderTasks() {
    console.log(date.value)
    const tasksContainer = document.getElementById('taskList');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.className = 'group mb-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark hover:border-primary hover:shadow-md transition-all duration-200';
        li.innerHTML = `<div class="flex gap-4 p-4">

                            <!-- Checkbox -->
                            <div class="pt-1">
                                <input
                                type="checkbox" ${task.completed ? 'checked' : ''}
                                class="${task.completed ? 'bg-primary border-primary' : 'border-gray-300'} h-5 w-5 rounded text-primary focus:ring-primary">
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
                                            class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium ${task.priority === 'high' ? 'text-red-800' : task.priority === 'medium' ? 'text-yellow-800' : 'text-green-800'}">

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

                                    <button
                                    class="rounded-lg p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700">

                                        <i class="ph ph-trash"></i>

                                    </button>

                                </div>

                            </div>

                        </div>

                        </li>`;
        tasksContainer.appendChild(taskElement);
    });
}
taskForm.addEventListener('submit', (event) => {
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
cancelTaskBtn.addEventListener('click', closeModal);
document.addEventListener('click', (event) => { 
    if (event.target.type === 'checkbox') {
        const taskId = event.target.closest('li').getAttribute('data-id');
        toggleCompletedStatus(taskId);
        handleCompleteTaskUi(taskId);
    }
});
window.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

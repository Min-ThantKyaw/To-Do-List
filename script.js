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

function openModal() {
    addTaskModal.classList.remove('hidden');
    taskForm.reset();
}

function closeModal() {
    addTaskModal.classList.add('hidden');
    taskForm.reset();
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function addTask() {
  //Input fields
  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  const priority = document.getElementById('priority').value.trim();
  const category = document.getElementById('category').value.trim();
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
    const title = document.getElementById('title').value.trim();
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value.trim();
    const category = document.getElementById('category').value.trim();

    const errors = {};
    if (!title) {
        errors.title = 'Title is required.';
    } else if (title.length > 255) {
        errors.title = "Title must be under 255 character."
    }
    if (!date) {
        errors.date = 'Date is required.';
    } else if (new Date(date) < new Date()) {
        errors.date = 'Date must be today or in the future.';
    }
    if (!priority) {
        errors.priority = 'Priority is required.';
    }
    if (!category) {
        errors.category = 'Category is required.';
    }
    return {valid: Object.keys(errors).length === 0, ...errors};
}

function showError(errors) {

    for (const [field, message] of Object.entries(errors)) {
        const errorEl = document.getElementById(`${field}Error`);
        const inputEl = document.getElementById(field);

        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        }

        if (inputEl) {
            inputEl.classList.add('ring-red-500', 'border-red-500');
        }
    }
}

 //Save task to local storage
function saveTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    closeModal();
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const validation = validateForm();
    console.log(validation);
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

//Show tasks
const priorityColors = {
    high: '',
    medium:'',
    low: ''
}

function renderTasks() {
  console.log(date.value)
    const tasksContainer = document.getElementById('taskList');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = ``;
        tasksContainer.appendChild(taskElement);
    });
}
// window.addEventListener('DOMContentLoaded', () => {
//     renderTasks();
// });

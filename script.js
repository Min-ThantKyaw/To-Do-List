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
}

function closeModal() {
    addTaskModal.classList.add('hidden');
    taskForm.reset();
}

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function addTask() {
  //Input fields
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const date = document.getElementById('date').value;
  const priority = document.getElementById('priority').value.trim();
  const category = document.getElementById('category').value.trim();
    const task = {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        date: date,
        priority: priority,
        category: category,
        completed: false,
        createdAt: new Date().toISOString(),
    };

    return task;
}
function validateForm() {

 }
function saveTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    closeModal();
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let task = addTask();
    saveTask(task);
    renderTasks();
});
cancelTaskBtn.addEventListener('click', closeModal);

//Show tasks
const priorityColors = {
    high: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800',
    medium:'',
    low: ''
}

function renderTasks() {
  console.log(date.value)
    const tasksContainer = document.getElementById('taskList');
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `<li class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <div class="px-4 py-4 sm:px-6 flex items-start gap-4">
                                <div class="mt-1">
                                    <input type="checkbox" id="taskCheckbox" ${task.completed ? 'checked' : ''}
                                        class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 cursor-pointer">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">${task.title}</p>
                                        <div class="ml-2 flex-shrink-0 flex">
                                            <span
                                                class="${priorityColors[task.priority]}">${task.priority.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div class="mt-2 sm:flex sm:justify-between">
                                        <div class="sm:flex">
                                            <p class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <i
                                                    class="ph ph-briefcase mr-1.5 text-lg flex-shrink-0 text-blue-500"></i>
                                                ${task.category.toUpperCase()}
                                            </p>
                                        </div>
                                        <div
                                            class="mt-2 flex items-center text-sm text-red-600 dark:text-red-400 sm:mt-0">
                                            <i class="ph ph-calendar mr-1.5 text-lg flex-shrink-0"></i>
                                            <p>${task.date}</p>
                                        </div>
                                    </div>
                                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">${task.description}
                                    </p>
                                </div>
                            </div>
                        </li>`;
        tasksContainer.appendChild(taskElement);
    });
}
window.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

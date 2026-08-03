import { toggleTheme } from './ui/theme.js';
import { initSidebar, onTabChange, getActiveTab } from './ui/sidebar.js';
import { pendingTasks } from './services/tasks.service.js';
import { renderTasks } from './components/TaskList.js';

const taskListEl = document.getElementById('taskList');

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

function loadAndRender() {
    pendingTasks().then(tasks => {
        renderTasks(getActiveTab(), taskListEl, tasks);
    });
}

function initApp() {
    initSidebar();
    loadAndRender();
    onTabChange(() => loadAndRender());
}

window.addEventListener('DOMContentLoaded', initApp);

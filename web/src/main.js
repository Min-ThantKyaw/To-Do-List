import { toggleTheme } from './ui/theme.js'
import { initSidebar } from './ui/sidebar.js'
import { pendingTasks } from './services/tasks.service.js';
import { renderTasks } from './components/TaskList.js';

const taskListEl = document.getElementById('taskList');

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

function initApp() {
    initSidebar();
    pendingTasks().then(tasks => {
        renderTasks(taskListEl, tasks);
    });
}

window.addEventListener('DOMContentLoaded', initApp);

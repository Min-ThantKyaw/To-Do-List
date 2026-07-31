import { toggleTheme } from './ui/theme.js'
import { initSidebar, updateSidebar } from './ui/sidebar.js'

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
function initApp() {
    initSidebar();
}

window.addEventListener('DOMContentLoaded', initApp);

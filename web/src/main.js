import { toggleTheme } from './ui/theme.js'
import { toggleSideBar } from './ui/sidebar.js'

function initApp() {

}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('sidebarToggle').addEventListener('click', toggleSideBar);

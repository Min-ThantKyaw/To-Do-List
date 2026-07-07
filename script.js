const themeToggleBtn = document.getElementById('themeToggle');
const sidebarToggleBtn = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const backdrop = document.getElementById('sidebarBackdrop');
const html = document.documentElement;

//UI state
let isSidebarOpen = localStorage.getItem('sidebarState') === 'true';
let theme = localStorage.getItem('theme') || 'light';
let isMobileView = window.innerWidth < 1024;
console.log(theme);
//Initialize theme and sidebar
function initTheme() {
    html.classList.toggle('dark', theme === 'dark');
}

//Initialize sidebar
function initSidebar() {
    if (isMobileView){
        if (isSidebarOpen) {
            backdrop.classList.remove('hidden');
            sidebar.classList.remove('-translate-x-full');
        } else {
            backdrop.classList.add('hidden');
            sidebar.classList.add('-translate-x-full');
        }
    } else {
        backdrop.classList.add('lg:hidden');
        backdrop.classList.add('hidden');
        sidebar.classList.toggle('-translate-x-full');
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
const STORAGE_KEY = 'sidebar';
let isSidebarOpen = false;

const backdrop = document.getElementById('sidebarBackdrop');
const sidebar = document.getElementById('sidebar');


export function toggleSideBar() {
    isSidebarOpen = !isSidebarOpen;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isSidebarOpen));
    applySideBar();
}



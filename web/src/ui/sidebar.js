const STORAGE_KEY = 'sidebar';
let isSidebarOpen = JSON.parse(localStorage.getItem(STORAGE_KEY)) || false;
const backdrop = document.getElementById('sidebarBackdrop');
const sidebar = document.getElementById('sidebar');
const sidebarMenu = document.getElementById('sidebarMenu');
const tabItems = sidebarMenu.querySelectorAll('.tab-item');

function isMobileView(){
    return window.innerWidth < 1024;
}

function setSidebarState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toggleSideBar() {
    isSidebarOpen = !isSidebarOpen;
    setSidebarState(isSidebarOpen);
    updateSidebar();
}

function updateSidebar() {
    if(isSidebarOpen){
        openSidebar();
    }else{
        closeSidebar()
    }
}

function openSidebar() {
    if (isMobileView()) {
        backdrop.classList.remove('hidden');
        sidebar.classList.remove('-translate-x-full');
    } else {
        backdrop.classList.add('hidden');
        sidebar.classList.remove('-translate-x-full');
    }
}

function closeSidebar() {
    isSidebarOpen = false;
    setSidebarState(isSidebarOpen);
    backdrop.classList.add('hidden');
    sidebar.classList.add('-translate-x-full');
}

export function initSidebar() {
    window.addEventListener('resize', () => {
        if (!isMobileView()) {
            backdrop.classList.add('hidden');
        }
    });
    backdrop.addEventListener('click', closeSidebar);
    document.getElementById('sidebarToggle').addEventListener('click', toggleSideBar);
    window.addEventListener('resize', updateSidebar);
    updateSidebar();
}

let onTabChangeCallback = null;

function storeActiveTab(tabId) {
    localStorage.setItem('activeTab', tabId);
    if (onTabChangeCallback) onTabChangeCallback(tabId);
}
export function getActiveTab() {
    return localStorage.getItem('activeTab');
}
export function onTabChange(callback) {
    onTabChangeCallback = callback;
}

function handleTabClick(event) {
    event.preventDefault();
    const clickedTab = event.target.closest('.tab-item');
    console.log(clickedTab);
    if(clickedTab){
        const tabId = clickedTab.dataset.tab;
        console.log(tabId);
        tabItems.forEach(item => {
            item.classList.remove('active');
        });
        clickedTab.classList.add('active');
        storeActiveTab(tabId);
    }
}

tabItems.forEach(item => {
    item.addEventListener('click', (event) => handleTabClick(event));
});



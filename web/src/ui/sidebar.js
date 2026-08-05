const STORAGE_KEY = 'sidebar';
const ACTIVE_TAB_KEY = 'activeTab';

let isSidebarOpen = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'false');
let onTabChangeCallback = null;

function isMobileView() {
  return window.innerWidth < 1024;
}

function setSidebarState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function openSidebar() {
  const backdrop = document.getElementById('sidebarBackdrop');
  const sidebar = document.getElementById('sidebar');

  backdrop.classList.toggle('hidden', !isMobileView());
  sidebar.classList.remove('-translate-x-full');
}

function closeSidebar() {
  const backdrop = document.getElementById('sidebarBackdrop');
  const sidebar = document.getElementById('sidebar');

  isSidebarOpen = false;
  setSidebarState(isSidebarOpen);
  backdrop.classList.add('hidden');
  sidebar.classList.add('-translate-x-full');
}

function updateSidebar() {
  if (isSidebarOpen || !isMobileView()) {
    openSidebar();
  } else {
    closeSidebar();
  }
}

function toggleSidebar() {
  isSidebarOpen = !isSidebarOpen;
  setSidebarState(isSidebarOpen);
  updateSidebar();
}

function setActiveTab(tabId) {
  const tabItems = document.querySelectorAll('.tab-item');
  tabItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.tab === tabId);
  });
  localStorage.setItem(ACTIVE_TAB_KEY, tabId);
  onTabChangeCallback?.(tabId);
}

function handleTabClick(event) {
  const clickedTab = event.target.closest('.tab-item');
  if (!clickedTab) return;
  event.preventDefault();
  setActiveTab(clickedTab.dataset.tab);
  if (isMobileView()) closeSidebar();
}

export function getActiveTab() {
  return localStorage.getItem(ACTIVE_TAB_KEY) || 'today';
}

export function onTabChange(callback) {
  onTabChangeCallback = callback;
}

export function initSidebar() {
  document.getElementById('sidebarBackdrop').addEventListener('click', closeSidebar);
  document.getElementById('sidebarToggle').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarMenu').addEventListener('click', handleTabClick);
  window.addEventListener('resize', updateSidebar);

  setActiveTab(getActiveTab());
  updateSidebar();
}

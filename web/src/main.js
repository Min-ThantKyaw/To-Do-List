import { initModal } from './components/modal.js';
import { initTaskForm, openTaskForm, updateTaskFormCategories } from './components/taskForm.js';
import { initCategoryInput, renderCategories } from './components/categoryList.js';
import { renderCompleted, renderPending, updateCompletedBadge } from './components/taskList.js';
import { addCategory, deleteCategory, loadCategories } from './services/categories.service.js';
import { createTask, deleteTask as removeTask, loadTasks, toggleTaskComplete, updateTask } from './services/tasks.service.js';
import { toggleTheme } from './ui/theme.js';
import { getActiveTab, initSidebar, onTabChange } from './ui/sidebar.js';
import { debounce } from './utils/dom.js';
import { filterTasks, sortTasks } from './utils/helpers.js';

const state = {
  tasks: [],
  categories: [],
  selectedCategory: '',
  search: '',
  sortBy: 'date',
};

function setTitle() {
  const titles = {
    today: 'Today Tasks',
    upcoming: 'Upcoming Tasks',
    completed: 'Completed Tasks',
  };
  document.getElementById('activeTabTitle').textContent = titles[getActiveTab()] || 'Tasks';
}

function getCategoryOptions() {
  const names = new Set(['Personal', 'Work', 'Shopping']);
  state.categories.forEach((category) => names.add(category.name));
  state.tasks.forEach((task) => {
    if (task.category) names.add(task.category);
  });
  return [...names].map((name) => ({ name }));
}

function getTaskHandlers() {
  return {
    onToggle: async (task, completed) => {
      await toggleTaskComplete(task, completed);
      await refreshTasks();
    },
    onEdit: (task) => openTaskForm(document.getElementById('addTaskModal'), task),
    onDelete: async (task) => {
      await removeTask(task.id);
      await refreshTasks();
    },
  };
}

function renderTaskViews() {
  setTitle();

  const filtered = filterTasks(state.tasks, {
    tab: getActiveTab(),
    category: state.selectedCategory,
    search: state.search,
  });
  const completed = filterTasks(state.tasks, {
    tab: 'completed',
    category: state.selectedCategory,
    search: state.search,
  });

  renderPending(document.getElementById('taskList'), sortTasks(filtered, state.sortBy), getTaskHandlers());
  renderCompleted(document.getElementById('completedList'), sortTasks(completed, state.sortBy), getTaskHandlers());
  updateCompletedBadge(completed.length);
}

async function refreshTasks() {
  state.tasks = await loadTasks(state.sortBy);
  updateTaskFormCategories(document.getElementById('addTaskModal'), getCategoryOptions());
  renderTaskViews();
}

async function refreshCategories() {
  state.categories = await loadCategories();
  updateTaskFormCategories(document.getElementById('addTaskModal'), getCategoryOptions());
  renderCategories(document.getElementById('categoryContainer'), state.categories, {
    onSelect: (categoryName) => {
      state.selectedCategory = state.selectedCategory === categoryName ? '' : categoryName;
      renderTaskViews();
    },
    onDelete: async (category) => {
      await deleteCategory(category.id);
      if (state.selectedCategory === category.name) state.selectedCategory = '';
      await refreshCategories();
      renderTaskViews();
    },
  });
}

function initCompletedToggle() {
  const button = document.getElementById('toggleCompleted');
  const list = document.getElementById('completedList');
  const arrow = document.getElementById('completedArrow');

  button.addEventListener('click', () => {
    list.classList.toggle('hidden');
    arrow.classList.toggle('-rotate-90');
  });
}

function initControls() {
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('categoriesToggle').addEventListener('click', () => {
    document.getElementById('categoriesDropdown').classList.toggle('hidden');
    document.getElementById('categoriesCaret').classList.toggle('rotate-180');
  });
  document.getElementById('addTaskBtn').addEventListener('click', () => {
    openTaskForm(document.getElementById('addTaskModal'));
  });
  document.getElementById('searchInput').addEventListener('input', debounce((event) => {
    state.search = event.target.value;
    renderTaskViews();
  }));
  document.getElementById('sortSelect').addEventListener('change', (event) => {
    state.sortBy = event.target.value;
    renderTaskViews();
  });
}

async function initApp() {
  const modal = document.getElementById('addTaskModal');
  initSidebar();
  initModal(modal);
  initControls();
  initCompletedToggle();
  initTaskForm(modal, {
    onSave: async (data) => {
      if (data.id) {
        await updateTask(data.id, data);
      } else {
        await createTask(data);
      }
      await refreshTasks();
    },
  });
  initCategoryInput({
    onAdd: async (name) => {
      await addCategory(name);
      await refreshCategories();
    },
  });
  onTabChange(renderTaskViews);

  await refreshCategories();
  await refreshTasks();
}

window.addEventListener('DOMContentLoaded', initApp);

import { createTaskItem } from './taskItem.js';

function renderList(container, tasks, handlers, emptyMessage) {
  container.innerHTML = '';

  if (!tasks.length) {
    container.innerHTML = `<li class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">${emptyMessage}</li>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  tasks.forEach((task) => fragment.append(createTaskItem(task, handlers)));
  container.append(fragment);
}

export function renderPending(container, tasks, handlers = {}) {
  renderList(container, tasks, handlers, 'No pending tasks match this view.');
}

export function renderCompleted(container, tasks, handlers = {}) {
  renderList(container, tasks, handlers, 'No completed tasks yet.');
}

export function updateCompletedBadge(count) {
  const badge = document.querySelector('.badge');
  if (badge) badge.textContent = String(count);
}

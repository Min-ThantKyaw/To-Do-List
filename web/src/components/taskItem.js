import { escapeHtml, formatDate } from '../utils/helpers.js';

const priorityColors = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export function buildTaskMarkup(task) {
  const completedClass = task.completed ? 'line-through opacity-50' : '';
  return `
    <div class="flex gap-4 p-4">
      <input type="checkbox" class="task-checkbox mt-0.5 h-5 w-5 shrink-0 accent-primary" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
      <div class="min-w-0 flex-1">
        <p class="break-words text-sm font-medium text-gray-900 dark:text-white ${completedClass}">${escapeHtml(task.title)}</p>
        <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span class="inline-flex items-center gap-1">
            <i class="ph ph-calendar"></i>
            ${formatDate(task.date)}
          </span>
          <span class="inline-flex items-center gap-1">
            <i class="ph ph-folder-simple"></i>
            ${escapeHtml(task.category || 'Personal')}
          </span>
          <span class="rounded-full px-2 py-0.5 capitalize ${priorityColors[task.priority] ?? priorityColors.medium}">
            ${escapeHtml(task.priority || 'medium')}
          </span>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-1">
        <button type="button" class="task-edit rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300" title="Edit task">
          <i class="ph ph-pencil"></i>
        </button>
        <button type="button" class="task-delete rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700" title="Delete task">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    </div>
  `;
}

export function createTaskItem(task, handlers = {}) {
  const { onToggle, onEdit, onDelete } = handlers;
  const li = document.createElement('li');
  li.dataset.id = task.id;
  li.className = 'group rounded-lg border border-gray-200 bg-white transition hover:border-primary hover:shadow-sm dark:border-gray-700 dark:bg-dark';
  li.innerHTML = buildTaskMarkup(task);

  li.querySelector('.task-checkbox').addEventListener('change', (event) => {
    onToggle?.(task, event.target.checked);
  });
  li.querySelector('.task-edit').addEventListener('click', () => onEdit?.(task));
  li.querySelector('.task-delete').addEventListener('click', () => onDelete?.(task));

  return li;
}

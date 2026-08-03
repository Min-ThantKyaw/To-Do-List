import { formatDate } from '../utils/helpers.js';
import { getActiveTab } from '../ui/sidebar.js'

const priorityColors = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export function createTitle(activeTab) {
    const activeTabTitle = document.getElementById('activeTabTitle');
    switch (activeTab) {
        case 'today':
            activeTabTitle.textContent = "Today Tasks";
            break;
        case 'upcoming':
            activeTabTitle.textContent = "Upcoming Tasks";
            break;
        case 'completed':
            activeTabTitle.textContent = "Completed Tasks";
            break;
        default:
            activeTabTitle.textContent = "Today Tasks";
    }
}
export function createTaskItem(task, handlers = {}) {
    const { onToggle, onEdit, onDelete } = handlers;

    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.className = 'group mb-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark hover:border-primary hover:shadow-md transition-all duration-200';

    li.innerHTML = `
        <div class="flex gap-4 p-4">
            <input type="checkbox" class="task-checkbox mt-0.5 h-5 w-5 shrink-0 accent-primary" ${task.completed ? 'checked' : ''}>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white ${task.completed ? 'line-through opacity-50' : ''}">${escapeHtml(task.title)}</p>
                <div class="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span class="inline-flex items-center gap-1">
                        <i class="ph ph-calendar"></i>
                        ${formatDate(task.date)}
                    </span>
                    <span class="inline-flex items-center gap-1">
                        <i class="ph ph-clock"></i>
                        ${formatDate(task.createdAt)}
                    </span>
                    <span class="rounded-full px-2 py-0.5 capitalize ${priorityColors[task.priority] ?? priorityColors.medium}">${task.priority}</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button class="task-edit rounded-lg p-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300">
                    <i class="ph ph-pencil"></i>
                </button>
                <button class="task-delete rounded-lg p-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        </div>
    `;

    li.querySelector('.task-checkbox').addEventListener('change', (e) => onToggle?.(task, e.target.checked));
    li.querySelector('.task-edit').addEventListener('click', () => onEdit?.(task));
    li.querySelector('.task-delete').addEventListener('click', () => onDelete?.(task));

    return li;
}

function escapeHtml(text) {
    return String(text ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

import { createTaskItem } from './TaskItem.js';

export function renderTasks(container, tasks, handlers = {}) {
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `<p class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">There is no task to do.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => fragment.append(createTaskItem(task, handlers)));
    container.append(fragment);
}

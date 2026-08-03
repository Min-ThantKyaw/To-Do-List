import { createTaskItem, createTitle } from './TaskItem.js';
import { filterTasks } from '../utils/helpers.js';
import { getActiveTab } from '../ui/sidebar.js';

export function renderTasks(activeTab= "today",container, tasks, handlers = {}) {
    container.innerHTML = '';
    activeTab = getActiveTab();
    createTitle(activeTab);
    const filtertasks = filterTasks(tasks, activeTab);
    if (filtertasks.length === 0) {
        container.innerHTML = `<p class="py-8 text-center text-sm text-gray-500 dark:text-gray-400">There is no task to do.</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    filtertasks.forEach((task) => fragment.append(createTaskItem(task, handlers)));
    container.append(fragment);
}

import { closeModal, openModal } from '../utils/dom.js';

export function renderTaskModal(modal) {
  modal.innerHTML = `
    <div id="modalBackdrop" class="fixed inset-0 bg-gray-900/80 transition-opacity cursor-pointer"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="relative w-full max-w-lg transform overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-xl transition-all dark:border-gray-700 dark:bg-dark">
          <div class="px-4 pb-4 pt-5 sm:p-6">
            <h3 class="text-lg font-semibold leading-6 text-gray-900 dark:text-white" id="modal-title">Create New Task</h3>
            <form class="mt-4 space-y-4" id="taskForm">
              <input type="hidden" id="taskId" name="id" />
              <div>
                <label for="title" class="sr-only">Task Title</label>
                <input type="text" name="title" id="title" class="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm" placeholder="What needs to be done?" />
                <span class="error-msg mt-1 block text-sm text-red-600" data-error-for="title"></span>
              </div>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label for="date" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Due Date</label>
                  <input type="date" id="date" name="date" class="mt-1 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm" />
                  <span class="error-msg mt-1 block text-sm text-red-600" data-error-for="date"></span>
                </div>
                <div>
                  <label for="priority" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Priority</label>
                  <select id="priority" name="priority" class="mt-1 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <span class="error-msg mt-1 block text-sm text-red-600" data-error-for="priority"></span>
                </div>
                <div class="sm:col-span-2">
                  <label for="category" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">Category / Project</label>
                  <select id="category" name="category" class="mt-1 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:ring-gray-700 sm:text-sm"></select>
                  <span class="error-msg mt-1 block text-sm text-red-600" data-error-for="category"></span>
                </div>
              </div>
            </form>
          </div>
          <div class="border-t border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50 sm:flex sm:flex-row-reverse sm:px-6">
            <button type="submit" form="taskForm" id="saveTaskBtn" class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto">Save Task</button>
            <button type="button" id="cancelTaskBtn" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:ring-gray-600 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initModal(modal) {
  renderTaskModal(modal);

  modal.querySelector('#modalBackdrop').addEventListener('click', () => closeModal(modal));
  modal.querySelector('#cancelTaskBtn').addEventListener('click', () => closeModal(modal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal(modal);
  });

  return {
    open: () => openModal(modal),
    close: () => closeModal(modal),
  };
}

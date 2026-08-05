import { escapeHtml } from '../utils/helpers.js';

export function renderCategories(container, categories, handlers = {}) {
  container.innerHTML = '';

  if (!categories.length) {
    container.innerHTML = '<p class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No categories</p>';
    return;
  }

  const fragment = document.createDocumentFragment();
  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-item group flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white';
    button.dataset.category = category.name;
    button.innerHTML = `
      <span class="flex min-w-0 items-center gap-2">
        <i class="ph ph-folder-simple text-gray-400"></i>
        <span class="truncate">${escapeHtml(category.name)}</span>
      </span>
      <span class="category-delete rounded p-1 text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100" role="button" tabindex="0" title="Delete category">
        <i class="ph ph-trash"></i>
      </span>
    `;

    button.addEventListener('click', () => handlers.onSelect?.(category.name));
    button.querySelector('.category-delete').addEventListener('click', (event) => {
      event.stopPropagation();
      handlers.onDelete?.(category);
    });
    fragment.append(button);
  });

  container.append(fragment);
}

export function initCategoryInput({ onAdd }) {
  const addButton = document.getElementById('categoryBtn');
  const input = document.getElementById('categoryInput');

  async function submitCategory() {
    if (input.classList.contains('hidden')) {
      input.classList.remove('hidden');
      input.focus();
      return;
    }
    const name = input.value.trim();
    if (!name) return;
    await onAdd(name);
    input.value = '';
    input.classList.add('hidden');
  }

  addButton.addEventListener('click', submitCategory);

  input.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await submitCategory();
    }
    if (event.key === 'Escape') {
      input.value = '';
      input.classList.add('hidden');
    }
  });
}

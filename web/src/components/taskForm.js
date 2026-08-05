import { clearErrors, closeModal, showError } from '../utils/dom.js';
import { escapeHtml, validateTask } from '../utils/helpers.js';

function getFormData(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    priority: data.priority,
    category: data.category,
  };
}

function setCategoryOptions(select, categories) {
  const options = categories.length
    ? categories
    : [{ name: 'Personal' }, { name: 'Work' }, { name: 'Shopping' }];

  select.innerHTML = options
    .map((category) => `<option value="${escapeHtml(category.name)}">${escapeHtml(category.name)}</option>`)
    .join('');
}

export function updateTaskFormCategories(modal, categories) {
  setCategoryOptions(modal.querySelector('#category'), categories);
}

export function openTaskForm(modal, task = null) {
  const form = modal.querySelector('#taskForm');
  const title = modal.querySelector('#modal-title');
  clearErrors(form);
  form.reset();

  title.textContent = task ? 'Edit Task' : 'Create New Task';
  form.elements.id.value = task?.id || '';
  form.elements.title.value = task?.title || '';
  form.elements.date.value = task?.date || new Date().toISOString().split('T')[0];
  form.elements.priority.value = task?.priority || 'medium';
  form.elements.category.value = task?.category || form.elements.category.value;
  modal.classList.remove('hidden');
}

export function initTaskForm(modal, { onSave }) {
  const form = modal.querySelector('#taskForm');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors(form);

    const data = getFormData(form);
    const validation = validateTask(data);
    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, message]) => {
        showError(form.querySelector(`[data-error-for="${field}"]`), message);
      });
      return;
    }

    await onSave(data);
    closeModal(modal);
  });
}

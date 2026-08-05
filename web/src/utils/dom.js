export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export function createEl(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function showError(element, message) {
  if (!element) return;
  element.textContent = message;
}

export function clearErrors(container) {
  qsAll('.error-msg', container).forEach((element) => {
    element.textContent = '';
  });
}

export function openModal(modal) {
  modal?.classList.remove('hidden');
}

export function closeModal(modal) {
  modal?.classList.add('hidden');
}

export function debounce(fn, ms = 250) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
}

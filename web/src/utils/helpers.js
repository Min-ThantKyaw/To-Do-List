export function formatDate(dateInput, locale = 'en-US') {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function escapeHtml(text) {
  return String(text ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function validateTask(data) {
  const errors = {};
  const title = String(data.title || '').trim();
  const priority = data.priority || 'medium';
  const allowedPriorities = ['low', 'medium', 'high'];

  if (!title) errors.title = 'Task title is required.';
  if (data.date && Number.isNaN(new Date(data.date).getTime())) {
    errors.date = 'Choose a valid date.';
  }
  if (!allowedPriorities.includes(priority)) {
    errors.priority = 'Choose a valid priority.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function normalizeTaskInput(data) {
  return {
    title: String(data.title || '').trim(),
    date: data.date || new Date().toISOString().split('T')[0],
    priority: data.priority || 'medium',
    category: data.category || 'Personal',
  };
}

export function sortTasks(tasks, by = 'date') {
  const priorityRank = { high: 0, medium: 1, low: 2 };
  return [...tasks].sort((a, b) => {
    if (by === 'priority') {
      return (priorityRank[a.priority] ?? 3) - (priorityRank[b.priority] ?? 3);
    }
    if (by === 'title') {
      return String(a.title || '').localeCompare(String(b.title || ''));
    }
    return String(a.date || '').localeCompare(String(b.date || ''));
  });
}

export function filterTasks(tasks, filters = {}) {
  const today = new Date().toISOString().split('T')[0];
  const search = String(filters.search || '').trim().toLowerCase();

  return tasks.filter((task) => {
    const date = task.date ? task.date.split('T')[0] : '';
    const matchesTab =
      filters.tab === 'completed'
        ? task.completed
        : filters.tab === 'upcoming'
          ? !task.completed && date > today
          : filters.tab === 'today'
            ? !task.completed && date === today
            : !task.completed;
    const matchesCategory = !filters.category || task.category === filters.category;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesSearch = !search || String(task.title || '').toLowerCase().includes(search);

    return matchesTab && matchesCategory && matchesPriority && matchesSearch;
  });
}

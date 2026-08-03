export function formatDate(dateInput, locale = 'en-US') {
    const date = new Date(dateInput);
    
    if (isNaN(date)) {
      return '—';
    }
  
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

export function filterTasks(tasks, activeTab) {
  const today = new Date().toISOString().split('T')[0];
  switch (activeTab) {
    case 'today':
      return tasks.filter(task => task.date && task.date.split('T')[0] === today);
    case 'upcoming':
      return tasks.filter(task => task.date && task.date.split('T')[0] > today);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
}

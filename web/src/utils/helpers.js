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

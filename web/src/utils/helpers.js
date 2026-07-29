function formatDate(dateInput, locale = 'en-US') {
    const date = new Date(dateInput);
    
    if (isNaN(date)) {
      return 'Invalid Date';
    }
  
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  }
  
  module.exports = { formatDate };
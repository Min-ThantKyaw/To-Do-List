exports.generateId = () => {
  return crypto.randomUUID();
};

exports.formatDate = (date) => {
  date = new Date().toISOString();
  return date;
}

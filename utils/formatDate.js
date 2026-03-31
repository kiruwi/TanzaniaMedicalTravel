export function formatDate(value, locale = 'en-US') {
  if (!value) {
    return 'Pending'
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium'
  }).format(new Date(value))
}

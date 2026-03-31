const inquiries = []
const quotes = []
const bookings = []
const auditLogs = [
  {
    id: 'AUD-1',
    actor_id: 'system',
    entity_type: 'seed',
    entity_id: 'initial',
    action: 'bootstrap',
    created_at: new Date().toISOString()
  }
]

export function listInquiries() {
  return inquiries
}

export function addInquiry(inquiry) {
  inquiries.unshift(inquiry)
  return inquiry
}

export function listQuotes() {
  return quotes
}

export function addQuote(quote) {
  quotes.unshift(quote)
  return quote
}

export function findQuote(id) {
  return quotes.find((quote) => quote.id === id) || null
}

export function updateQuote(id, updates) {
  const quote = findQuote(id)

  if (!quote) {
    return null
  }

  Object.assign(quote, updates)
  return quote
}

export function listBookings() {
  return bookings
}

export function addBooking(booking) {
  bookings.unshift(booking)
  return booking
}

export function updateBooking(id, updates) {
  const booking = bookings.find((item) => item.id === id)

  if (!booking) {
    return null
  }

  Object.assign(booking, updates)
  return booking
}

export function listAuditLogs() {
  return auditLogs
}

export function addAuditLog(entry) {
  auditLogs.unshift(entry)
  return entry
}

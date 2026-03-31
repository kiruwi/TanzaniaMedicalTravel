export function calculateQuoteTotals(items = []) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.total_price || 0), 0)
  return {
    subtotal,
    coordinator_fee: Math.round(subtotal * 0.08),
    total_cost: Math.round(subtotal * 1.08)
  }
}

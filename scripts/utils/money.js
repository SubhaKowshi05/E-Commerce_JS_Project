export function formatCurrency(priceCents) {
  return `Rs.${(Math.round(priceCents) / 100).toFixed(2)}`;
}

export default formatCurrency;
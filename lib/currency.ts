const integerAmountFormatter = new Intl.NumberFormat("en-NP", {
  maximumFractionDigits: 2,
});
const fractionalAmountFormatter = new Intl.NumberFormat("en-NP", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError("Currency amount must be a finite number.");
  }

  const formattedAmount = Number.isInteger(amount)
    ? integerAmountFormatter.format(amount)
    : fractionalAmountFormatter.format(amount);
  return `Rs. ${formattedAmount}`;
}

export function formatFC(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FC';
}

export function formatFShort(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + 'f';
}

export function formatUSD(amountFC: number, rate = 2800): string {
  const usd = amountFC / rate;
  return '$' + usd.toFixed(2);
}

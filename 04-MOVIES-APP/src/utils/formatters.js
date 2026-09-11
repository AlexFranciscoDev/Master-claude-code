export function formatYear(dateString) {
  return dateString ? dateString.slice(0, 4) : 'Unknown';
}

export function formatRuntime(minutes) {
  if (!minutes) return 'Unknown runtime';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatDate(dateString) {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatCurrency(amount) {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRating(voteAverage) {
  return typeof voteAverage === 'number' ? voteAverage.toFixed(1) : 'N/A';
}

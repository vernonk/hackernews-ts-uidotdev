export function formatDate(date: number) {
  return new Date(date * 1000).toLocaleString('en-US', { 
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric' 
  });
}
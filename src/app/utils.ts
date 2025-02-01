export const getChartLabels = (selectedTime: string): string[] => {
  const now = new Date();
  switch (selectedTime) {
    case '24H':
      return Array.from({length: 7}, (_, i) => {
        const date = new Date(now.getTime() - i * 4 * 60 * 60 * 1000);
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      }).reverse();
    case '1W':
      return Array.from({length: 7}, (_, i) => {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        return date.toLocaleDateString('en-US', {weekday: 'short'});
      }).reverse();
    case '1M':
      return Array.from({length: 4}, (_, i) => {
        const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        });
      }).reverse();
    case '3M':
      return Array.from({length: 3}, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        return date.toLocaleDateString('en-US', {month: 'short'});
      }).reverse();
    case '1Y':
      return Array.from({length: 4}, (_, i) => {
        const date = new Date(now.getFullYear(), now.getMonth() - i * 3, 1);
        return `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`;
      }).reverse();
    default:
      return [];
  }
};

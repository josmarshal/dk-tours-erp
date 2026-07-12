export const parseDate = (dateStr: string): Date => {
  // expects "dd-mm-yyyy"
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0] as string, 10);
    const month = parseInt(parts[1] as string, 10) - 1; // months are 0-indexed in JS Date
    const year = parseInt(parts[2] as string, 10);
    return new Date(Date.UTC(year, month, day));
  }
  // Fallback to default parsing if format is wrong
  return new Date(dateStr);
};

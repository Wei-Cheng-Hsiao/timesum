export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const parseTimeString = (timeStr: string): { hours: number; minutes: number } => {
  const [h, m] = timeStr.split(':').map(Number);
  return { hours: h || 0, minutes: m || 0 };
};

export const addTime = (
  baseTimeStr: string,
  addHours: number,
  addMinutes: number
): { result: string; isNextDay: boolean } => {
  const { hours: baseH, minutes: baseM } = parseTimeString(baseTimeStr);
  
  const totalMinutes = baseH * 60 + baseM + addHours * 60 + addMinutes;
  
  // Normalize to day (1440 minutes in a day)
  let newTotalMinutes = totalMinutes % 1440;
  if (newTotalMinutes < 0) newTotalMinutes += 1440; // Handle negative inputs if we ever allowed them
  
  const newHours = Math.floor(newTotalMinutes / 60);
  const newMinutes = newTotalMinutes % 60;
  
  const isNextDay = totalMinutes >= 1440;

  const result = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
  
  return { result, isNextDay };
};
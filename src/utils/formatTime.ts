export const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  
  return d.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

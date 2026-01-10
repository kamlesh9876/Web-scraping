export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const extractNumber = (text: string): number => {
  const match = text?.match(/[\d,]+\.?\d*/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
};

export const cleanText = (text: string): string => {
  return text?.trim().replace(/\s+/g, ' ') || '';
};

export const generateSourceId = (url: string): string => {
  return Buffer.from(url).toString('base64').replace(/[/+=]/g, '').substring(0, 24);
};

export const isDataStale = (lastScrapedAt: Date | null, ttlMs: number): boolean => {
  if (!lastScrapedAt) return true;
  return Date.now() - lastScrapedAt.getTime() > ttlMs;
};

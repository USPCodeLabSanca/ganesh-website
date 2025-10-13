"use client"

export function formatDate(date: Date, locale: string, t: (key: string) => string) {
  const dateToCompare = new Date(date.getTime() + new Date().getTimezoneOffset() * 60000);

  const now = new Date();
  const diff = now.getTime() - dateToCompare.getTime();

  if (diff < 1000 * 60 * 60) {
    const minutes = Math.round(diff / (1000 * 60));
    if (minutes === 0) return t('now');
    else if (minutes === 1) return t('minuteAgo');
    return `${minutes} ${t('minutesAgo')}`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.round(diff / (1000 * 60 * 60));
    if (hours === 1) return t('hourAgo');
    return `${Math.round(diff / (1000 * 60 * 60))} ${t('hoursAgo')}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    if (days === 1) return t('dayAgo');
    return `${Math.round(diff / (1000 * 60 * 60 * 24))} ${t('daysAgo')}`;
  }
  
  return dateToCompare.toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR');
}
/**
 * Форматирование разрядов числа
 * @param date {Number}
 * @param options {Object}
 * @returns {String}
 */
export default function dateFormat(date, locale = 'ru-RU', options = {}) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(date));
}

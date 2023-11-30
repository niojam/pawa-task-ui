import { format, utcToZonedTime } from 'date-fns-tz';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';
export const ISO_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ssX";
export const UCT_TIMEZONE = 'UCT';

export const formatInTimeZone = (date: Date | string, dateTimeFormat, timeZone): string =>
  format(utcToZonedTime(date, timeZone), dateTimeFormat, { timeZone: timeZone });

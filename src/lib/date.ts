import { toDate, formatInTimeZone } from 'date-fns-tz';
import compareAsc from 'date-fns/compareAsc';
import compareDesc from 'date-fns/compareDesc';

const TIMEZONE = 'Europe/Madrid';
const TODATE_OPTS = { timeZone: TIMEZONE };

export const formatDateStringWithTimezone = (datestr: string) => {
    const date = toDate(datestr, TODATE_OPTS);
    return formatInTimeZone(date, TIMEZONE, 'dd MMMM yyyy hh:mm aaa');
};

export const formatW3CDateWithTimezone = (datestr: string) => {
    const date = toDate(datestr, TODATE_OPTS);
    return formatInTimeZone(date, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssxxx");
};

export const compareDateStr = (
    dateStrA: string,
    dateStrB: string,
    order: 'asc' | 'desc' = 'asc',
): number => {
    const dateA = toDate(dateStrA, TODATE_OPTS);
    const dateB = toDate(dateStrB, TODATE_OPTS);
    return order === 'desc'
        ? compareDesc(dateA, dateB)
        : compareAsc(dateA, dateB);
};

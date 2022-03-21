import formatDate from 'date-fns/format';
import { toDate } from 'date-fns-tz';
import compareAsc from 'date-fns/compareAsc';
import compareDesc from 'date-fns/compareDesc';

const TODATE_OPTS = { timeZone: 'Europe/Madrid' };

export const formatDateStringWithTimezone = (datestr: string) => {
    const date = toDate(datestr, TODATE_OPTS);
    return formatDate(date, 'dd MMMM yyyy hh:mm aaa');
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

import formatDate from 'date-fns/format';
import { toDate } from 'date-fns-tz';

export const formatDateStringWithTimezone = (datestr: string) => {
    const date = toDate(datestr, {
        timeZone: 'Europe/Madrid',
    });
    return formatDate(date, 'dd MMMM yyyy hh:mm aaa');
};

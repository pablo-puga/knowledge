import add from 'date-fns/add';
import formatISO from 'date-fns/formatISO';
import parseISO from 'date-fns/parseISO';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    value: number;
    expires: string;
    ttl: number;
};

let cache: Omit<Data, 'ttl'> | undefined;

const newExpires = () => formatISO(add(new Date(), { minutes: 1 }));

const cacheIsValid = (now: Date) => now < parseISO(cache!.expires);

const getTTL = (end: Date, start: Date) =>
    Math.round((end.getTime() - start.getTime()) / 1000);

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (!cache) {
        cache = {
            value: 0,
            expires: newExpires(),
        };

        return res.status(200).json({ ...cache, ttl: 60 });
    }

    if (cacheIsValid(new Date()))
        return res.status(200).json({
            ...cache,
            ttl: getTTL(parseISO(cache.expires), new Date()),
        });

    cache.value++;
    cache.expires = newExpires();

    res.status(200).json({ ...cache, ttl: 60 });
};

export default handler;

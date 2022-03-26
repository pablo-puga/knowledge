import { useDebugValue, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const COOKIE_CONSENT_NAME = 'cookie-consent';
const COOKIE_CONSENT_MAXAGE_DAYS = 30;
export const COOKIE_CONSENT_MAXAGE = 60 * 60 * 24 * COOKIE_CONSENT_MAXAGE_DAYS; //1 month
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const useCookieConsent = () => {
    const [needsConsent, setNeedsConsent] = useState<boolean>();
    const [allowed, setAllowed] = useState<boolean>();

    useEffect(() => {
        const consentCookie = Cookies.get(COOKIE_CONSENT_NAME);
        if (!consentCookie) {
            setNeedsConsent(true);
            setAllowed(true);
        } else {
            setNeedsConsent(false);
            setAllowed(consentCookie === 'yes');
        }
    }, []);

    useDebugValue({ needsConsent, allowed }, ({ needsConsent, allowed }) => {
        if (needsConsent) return 'pending (temporarily allowed)';
        return allowed ? 'allowed' : 'denied';
    });

    return {
        allowed: allowed,
        needsConsent,
        reject: () => {
            setNeedsConsent(false);
            setAllowed(false);
            Cookies.set(COOKIE_CONSENT_NAME, 'no', {
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: COOKIE_CONSENT_MAXAGE_DAYS,
            });
            Cookies.remove('_ga', { path: '/', domain: document.domain });
            Cookies.remove('_gid', { path: '/', domain: document.domain });
            Cookies.remove('_gat', { path: '/', domain: document.domain });
            if (typeof window !== undefined) {
                (window as any)[`ga-disable-${GA_ID}`] = true;
            }
        },
        accept: () => {
            setNeedsConsent(false);
            setAllowed(true);
            Cookies.set(COOKIE_CONSENT_NAME, 'yes', {
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: COOKIE_CONSENT_MAXAGE_DAYS,
            });
            if (typeof window !== undefined) {
                (window as any)[`ga-disable-${GA_ID}`] = false;
            }
        },
    };
};

export default useCookieConsent;

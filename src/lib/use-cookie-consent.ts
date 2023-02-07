import Cookies from 'js-cookie';
import { useDebugValue, useEffect, useState } from 'react';

const COOKIE_CONSENT_NAME = 'cookie-consent';
const COOKIE_CONSENT_MAXAGE_DAYS = 30 * 3;
export const COOKIE_CONSENT_MAXAGE = 60 * 60 * 24 * COOKIE_CONSENT_MAXAGE_DAYS; //1 month
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const useCookieConsent = () => {
    const [needsConsent, setNeedsConsent] = useState<boolean>();
    const [allowed, setAllowed] = useState<boolean>();

    useEffect(() => {
        const consentCookie = Cookies.get(COOKIE_CONSENT_NAME);
        if (!consentCookie) {
            setNeedsConsent(true);
            setAllowed(false);
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
            Cookies.set(COOKIE_CONSENT_NAME, 'no', {
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: COOKIE_CONSENT_MAXAGE_DAYS,
            });

            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: 'denied',
                });
            }

            Cookies.remove('_ga', { path: '/', domain: location.hostname });
            if (GA_ID) {
                Cookies.remove(GA_ID.replace('G-', '_ga-'), {
                    path: '/',
                    domain: location.hostname,
                });
            }
            Cookies.remove('_gid', { path: '/', domain: location.hostname });
            Cookies.remove('_gat', { path: '/', domain: location.hostname });
            if (typeof window !== undefined) {
                (window as any)[`ga-disable-${GA_ID}`] = true;
            }

            setNeedsConsent(false);
            setAllowed(false);
        },
        accept: () => {
            Cookies.set(COOKIE_CONSENT_NAME, 'yes', {
                path: '/',
                secure: true,
                sameSite: 'strict',
                expires: COOKIE_CONSENT_MAXAGE_DAYS,
            });
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    analytics_storage: 'granted',
                });
            }
            if (typeof window !== undefined) {
                (window as any)[`ga-disable-${GA_ID}`] = false;
            }

            setNeedsConsent(false);
            setAllowed(true);
        },
    };
};

export default useCookieConsent;

import { useDebugValue, useEffect, useRef, useState } from 'react';

const COOKIE_CONSENT_NAME = 'cookie-consent';
export const COOKIE_CONSENT_MAXAGE = 60 * 60 * 24 * 30; //1 month

export const useCookieConsent = () => {
    const documentRef = useRef<Document>();
    const [needsConsent, setNeedsConsent] = useState<boolean>();
    const [allowed, setAllowed] = useState<boolean>();

    useEffect(() => {
        const _document = document;
        const consentCookie = _document.cookie
            .split(';')
            .find((cookie) =>
                cookie.trim().startsWith(`${COOKIE_CONSENT_NAME}=`),
            )
            ?.split('=')[1];
        if (!consentCookie) {
            setNeedsConsent(true);
            setAllowed(false);
        } else {
            setNeedsConsent(false);
            setAllowed(consentCookie === 'yes');
        }
        documentRef.current = _document;
    }, []);

    useDebugValue({ needsConsent, allowed }, ({ needsConsent, allowed }) =>
        needsConsent ? 'pending' : allowed ? 'aproved' : 'denied',
    );

    return {
        allowed: !needsConsent && allowed,
        needsConsent,
        reject: () => {
            setNeedsConsent(false);
            setAllowed(false);
            if (!documentRef.current) return;
            documentRef.current.cookie = `${COOKIE_CONSENT_NAME}=no;path=/;secure=true;samesite=strict;max-age=${COOKIE_CONSENT_MAXAGE}`;
        },
        accept: () => {
            setNeedsConsent(false);
            setAllowed(true);
            if (!documentRef.current) return;
            documentRef.current.cookie = `${COOKIE_CONSENT_NAME}=yes;path=/;secure=true;samesite=strict;max-age=${COOKIE_CONSENT_MAXAGE}`;
        },
    };
};

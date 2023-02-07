import '../../styles/globals.css';
import Script from 'next/script';

import CookieConsent from '../components/CookieConsent';
import Layout from '../components/Layout';
import useCookieConsent, {
    COOKIE_CONSENT_MAXAGE,
    GA_ID,
} from '../lib/use-cookie-consent';

import type { AppProps, NextWebVitalsMetric } from 'next/app';

const KnowledgeApp = ({ Component, pageProps }: AppProps) => {
    const cookieConsent = useCookieConsent();

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('consent', 'default', {
                        'ad_storage': 'denied',
                        'analytics_storage': 'denied'
                    });

                    gtag('config', '${GA_ID}', { cookie_flags: 'max-age=${COOKIE_CONSENT_MAXAGE}'});
                `}
            </Script>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            {cookieConsent.needsConsent && (
                <CookieConsent
                    accept={cookieConsent.accept}
                    reject={cookieConsent.reject}
                />
            )}
        </>
    );
};

export const reportWebVitals = ({
    id,
    name,
    label,
    value,
    attribution,
}: NextWebVitalsMetric) => {
    if (window.gtag)
        window.gtag('event', name, {
            event_category:
                label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
            value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
            event_label: id, // id unique to current page load
            non_interaction: true, // avoids affecting bounce rate.
            debug_target: attribution,
        });
};

export default KnowledgeApp;

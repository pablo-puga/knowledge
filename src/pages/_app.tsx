import '../../styles/globals.css';
import Script from 'next/script';

import CookieConsent from '../components/CookieConsent';
import Layout from '../components/Layout';
import useCookieConsent, {
    COOKIE_CONSENT_MAXAGE,
    GA_ID,
} from '../lib/use-cookie-consent';

import type { AppProps } from 'next/app';

const KnowledgeApp = ({ Component, pageProps }: AppProps) => {
    const cookieConsent = useCookieConsent();

    return (
        <>
            {cookieConsent.allowed && (
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
                                'analytics_storage': 'granted'
                            });

                            gtag('config', '${GA_ID}', { cookie_flags: 'max-age=${COOKIE_CONSENT_MAXAGE}'});
                        `}
                    </Script>
                </>
            )}
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

export default KnowledgeApp;

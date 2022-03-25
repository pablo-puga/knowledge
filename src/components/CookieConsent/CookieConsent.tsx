import clsx from 'clsx';
import { useState } from 'react';

import styles from './CookieConsent.module.css';

const margin = 8;

interface CookieConsentProps {
    accept: () => void;
    reject: () => void;
}

const CookieConsent = (props: CookieConsentProps) => {
    const [hidden, setHidden] = useState(false);

    const accept = () => {
        setHidden(true);
        setTimeout(() => {
            props.accept();
        }, 250);
    };

    const reject = () => {
        setHidden(true);
        setTimeout(() => {
            props.reject();
        }, 250);
    };

    return (
        <article
            className={clsx(
                'fixed bg-quinary sm:shadow-sm sm:shadow-quinary text-white p-4 sm:max-w-lg text-sm sm:text-base',
                hidden && styles['consent-hidden'],
            )}
            style={{
                right: `${margin}px`,
                bottom: `${margin}px`,
                width: `calc(100% - ${margin * 2}px)`,
            }}
        >
            <h1 className="font-medium text-lg sm:text-xl">Cookie Consent</h1>
            <p className="mt-2">
                This webpage uses cookies to measure the traffic and the
                performance through Google Analytics.
            </p>
            <div className="mt-2 flex flex-row justify-end gap-4">
                <button
                    className="bg-quaternary text-gray-900 px-3 py-1 rounded-sm font-medium hover:bg-tertiary transition-colors duration-200"
                    onClick={accept}
                >
                    Accept
                </button>
                <button
                    className="bg-quaternary text-gray-900 px-3 py-1 rounded-sm font-medium hover:bg-primary hover:text-white transition-colors duration-200"
                    onClick={reject}
                >
                    Reject
                </button>
            </div>
        </article>
    );
};

export default CookieConsent;

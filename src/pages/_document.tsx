import { Head, Html, Main, NextScript } from 'next/document';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const Document = () => {
    return (
        <Html lang="en-US" className="theme-dark">
            <Head>
                <meta
                    property="og:image"
                    content={`${BASE_URL}/knowledge-256x256.png`}
                />
                <link
                    rel="icon"
                    href={`${BASE_URL}/favicon.ico`}
                    type="image/x-icon"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;

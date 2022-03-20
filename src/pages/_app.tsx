import '../../styles/globals.css';
import type { AppProps } from 'next/app';

const KnowledgeApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default KnowledgeApp;

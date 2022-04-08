import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CustomCode from './CustomCode';
import getCustomHeader from './CustomHeader';
import style from './PostContent.module.css';

const Content = ({
    markdown,
    className = undefined,
}: {
    markdown: string;
    className?: string;
}) => {
    return (
        <section className={clsx(style.content, className)}>
            <ReactMarkdown
                components={{
                    code: CustomCode,
                    h1: getCustomHeader(1),
                    h2: getCustomHeader(2),
                    h3: getCustomHeader(3),
                    h4: getCustomHeader(4),
                    h5: getCustomHeader(5),
                    h6: getCustomHeader(6),
                }}
                plugins={[remarkGfm]}
            >
                {markdown}
            </ReactMarkdown>
        </section>
    );
};

export default Content;

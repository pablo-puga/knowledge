import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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
                    code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
                plugins={[remarkGfm]}
            >
                {markdown}
            </ReactMarkdown>
        </section>
    );
};

export default Content;

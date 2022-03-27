import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FaLink } from 'react-icons/fa';

import style from './PostContent.module.css';
import type { PropsWithChildren } from 'react';
import type { HeadingProps } from 'react-markdown/lib/ast-to-react';

const getCustomHeader = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const TagName = `h${level}` as keyof JSX.IntrinsicElements;
    const CustomHeader = ({
        children,
        className,
    }: PropsWithChildren<HeadingProps>) => {
        const title = children[0];
        const slug = title
            ?.toString()
            .toLowerCase()
            .replace(/[()\/]/g, '')
            .replace(/\s/g, '-');
        return (
            <TagName className={clsx(className, style.header)} id={slug}>
                {title}
                <a
                    aria-hidden={true}
                    tabIndex={-1}
                    href={`#${slug}`}
                    className={style['header-link']}
                >
                    <FaLink className="inline-block" aria-hidden={true} />
                </a>
            </TagName>
        );
    };
    return CustomHeader;
};

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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

import type { PropsWithChildren } from 'react';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CustomCode = ({
    inline,
    className,
    children,
    ...props
}: PropsWithChildren<CodeProps>) => {
    const otherProps: Partial<CodeProps> = props;
    const match = /language-(\w+)/.exec(className || '');
    if (otherProps.node) delete otherProps.node;
    return !inline && match ? (
        <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="div"
            {...otherProps}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    ) : (
        <code className={className} {...otherProps}>
            {children}
        </code>
    );
};

export default CustomCode;

import type { PropsWithChildren } from 'react';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Metadata {
    withLineNumbers: boolean;
}

const parseRawMetaData = (rawMetaData: string): Record<string, string> => {
    const metadata: Record<string, string> = {};

    rawMetaData.split(' ').forEach((item) => {
        const trimmedItem = item.trim();
        if (trimmedItem.length === 0) return;
        const match = trimmedItem.match(/^(?<option>\w+)=(?<value>\S+)$/);
        if (!match) return;
        if (!match.groups) return;
        if (!match.groups.option) return;
        if (!match.groups.value) return;

        metadata[match.groups.option] = match.groups.value;
    });

    return metadata;
};

const parseMetaData = (rawMetaData: string): Metadata => {
    const parsedMetadata = parseRawMetaData(rawMetaData);

    return {
        withLineNumbers: parsedMetadata?.numbers === 'yes',
    };
};

const CustomCode = ({
    inline,
    className,
    children,
    node,
    ...props
}: PropsWithChildren<CodeProps>) => {
    const match = /language-(\w+)/.exec(className || '');
    const metadata = parseMetaData((node?.data?.meta as string) || '');
    return !inline && match ? (
        <SyntaxHighlighter
            style={dracula}
            showLineNumbers={metadata.withLineNumbers}
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
};

export default CustomCode;

import type { PropsWithChildren } from 'react';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';

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

const LanguageDisplay = ({ children }: { children: string }) => (
    <span className="absolute top-1 right-1 rounded-sm text-xs font-bold align-text-top px-2 pt-0.5 pb-0.5 text-theme-white bg-theme-purple/70">
        {children}
    </span>
);

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
        <>
            <LanguageDisplay>{match[1]}</LanguageDisplay>
            <SyntaxHighlighter
                style={dracula}
                showLineNumbers={metadata.withLineNumbers}
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        </>
    ) : (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export default CustomCode;

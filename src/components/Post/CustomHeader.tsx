import clsx from 'clsx';
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
        const anchorTitle =
            typeof title === 'string' ? title : `Anchor to ${slug}`;
        return (
            <TagName className={clsx(className, style.header)} id={slug}>
                {title}
                <a
                    aria-hidden={true}
                    tabIndex={-1}
                    href={`#${slug}`}
                    className={style['header-link']}
                    title={anchorTitle}
                >
                    <FaLink className="inline-block" aria-hidden={true} />
                </a>
            </TagName>
        );
    };
    return CustomHeader;
};

export default getCustomHeader;

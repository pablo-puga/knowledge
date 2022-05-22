import clsx from 'clsx';
import Link from 'next/link';
import { colorIsLight } from '../../lib/colors';

const Tag = ({
    children,
    color = undefined,
}: {
    children: string;
    color?: string;
}) => {
    return (
        <span
            className={clsx(
                'px-1.5 py-0.5 rounded-sm bg-gray-300 hover:hue-rotate-30 transition-all duration-200',
                color && !colorIsLight(color)
                    ? 'text-theme-white'
                    : 'text-theme-black',
            )}
            style={{ backgroundColor: color }}
        >
            <Link href={`/tag/${children}`}>
                <a>{children}</a>
            </Link>
        </span>
    );
};

export default Tag;

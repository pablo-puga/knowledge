import Link from 'next/link';

const Tag = ({
    children,
    color = undefined,
}: {
    children: string;
    color?: string;
}) => {
    return (
        <span
            className={
                'px-1.5 py-0.5 rounded-sm bg-gray-300 hover:hue-rotate-30 transition-all duration-200 text-theme-black'
            }
            style={{ backgroundColor: color }}
        >
            <Link href={`/tag/${children}`}>
                <a>{children}</a>
            </Link>
        </span>
    );
};

export default Tag;

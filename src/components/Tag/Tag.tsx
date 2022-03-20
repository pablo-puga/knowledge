import clsx from 'clsx';
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
                'px-1.5 py-0.5 rounded-sm bg-gray-300',
                color && !colorIsLight(color) && 'text-white',
            )}
            style={{ backgroundColor: color }}
        >
            {children}
        </span>
    );
};

export default Tag;

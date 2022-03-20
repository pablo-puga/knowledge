import clsx from 'clsx';
import { useContext } from 'react';
import { colorIsLight } from '../../lib/colors';
import { TagsContext } from '../../pages';

const Tag = ({ children }: { children: string }) => {
    const tagsContext = useContext(TagsContext);
    const color = tagsContext?.[children].color;
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

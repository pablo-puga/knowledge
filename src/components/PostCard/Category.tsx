import clsx from 'clsx';
import { useCategoryDataContext } from '../CategoryData';

const Category = ({
    children,
    className = undefined,
}: {
    children: string;
    className?: string;
}) => {
    const categoryData = useCategoryDataContext();
    const color = categoryData?.[children].color;
    return (
        <span
            className={clsx(
                'text-sm font-medium flex flex-row flex-nowrap border-l-gray-300 pl-1 mt-1',
                className,
            )}
            style={{
                borderLeftColor: color,
                borderLeftWidth: '3px',
                marginLeft: '1px',
            }}
        >
            {children}
        </span>
    );
};

export default Category;

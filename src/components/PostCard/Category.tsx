import { useContext } from 'react';
import { CategoriesContext } from '../../pages';

const Category = ({ children }: { children: string }) => {
    const categoriesContext = useContext(CategoriesContext);
    const color = categoriesContext?.[children];
    return (
        <span
            className="text-sm font-medium flex flex-row flex-nowrap border-l-2 border-l-gray-300 pl-1"
            style={{ borderLeftColor: color }}
        >
            {children}
        </span>
    );
};

export default Category;

import { createContext } from 'react';

import type { CategoryDataRegister } from '../../types';
import type { ReactNode } from 'react';

export const CategoryDataContext = createContext<CategoryDataRegister>({});

const CategoryData = ({
    categories,
    children,
}: {
    categories: CategoryDataRegister;
    children: ReactNode;
}) => {
    return (
        <CategoryDataContext.Provider value={categories}>
            {children}
        </CategoryDataContext.Provider>
    );
};

export default CategoryData;

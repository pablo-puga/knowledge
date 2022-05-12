import { useContext } from 'react';
import { CategoryDataContext } from './CategoryData';

export const useCategoryDataContext = () => {
    const tags = useContext(CategoryDataContext);
    return tags;
};

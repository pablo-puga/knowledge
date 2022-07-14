import { useContext } from 'react';

import { TagDataContext } from './TagData';

export const useTagDataContext = () => {
    const tags = useContext(TagDataContext);
    return tags;
};

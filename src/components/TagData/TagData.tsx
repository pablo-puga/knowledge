import type { ReactNode } from 'react';
import { createContext } from 'react';
import type { TagDataRegister } from '../../types';

export const TagDataContext = createContext<TagDataRegister>({});

const TagData = ({
    tags,
    children,
}: {
    tags: TagDataRegister;
    children: ReactNode;
}) => {
    return (
        <TagDataContext.Provider value={tags}>
            {children}
        </TagDataContext.Provider>
    );
};

export default TagData;

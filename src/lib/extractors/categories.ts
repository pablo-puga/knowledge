import { lstat, readdir } from 'fs/promises';
import { join as pathJoin } from 'path';

import { generateRandonDarkColorHexCode } from '../colors';

import type { CategoryDataRegister } from '../../types';

export const getCategoriesFromFileSystem = async () => {
    const knowledgeDirectory = pathJoin(process.cwd(), 'knowledge');
    const directoryItems = await readdir(knowledgeDirectory);
    const categories = [];
    for (const item of directoryItems) {
        const itemPath = pathJoin(knowledgeDirectory, item);
        const itemStat = await lstat(itemPath);
        if (!itemStat.isDirectory()) continue;
        categories.push(item);
    }
    return categories;
};

export const getColoredCategoriesFromFileSystem = async () => {
    const categories = await getCategoriesFromFileSystem();

    const categoriesWithColors: CategoryDataRegister = {};
    for (const category of categories) {
        categoriesWithColors[category] = {
            color: generateRandonDarkColorHexCode(),
        };
    }

    return categoriesWithColors;
};

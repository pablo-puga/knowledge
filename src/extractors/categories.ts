import { readdir, lstat } from 'fs/promises';
import { join as pathJoin } from 'path';

export const getCategoriesFromFileSystem = async () => {
    const knowledgeDirectory = pathJoin(__dirname, '../../knowledge');
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
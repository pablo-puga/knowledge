import { lstat, readdir, readFile } from 'fs/promises';
import { join as pathJoin } from 'path';
import matter from 'gray-matter';
import { toDate } from 'date-fns-tz';
import type { Post } from '../types';
import { getCategoriesFromFileSystem } from './categories';

export const getPostsFromFileSystem = async () => {
    const knowledgeDirectory = pathJoin(__dirname, '../../knowledge');
    const categories = await getCategoriesFromFileSystem();

    const posts: Post[] = [];

    for (const category of categories) {
        const categoryDirectory = pathJoin(knowledgeDirectory, category);
        const directoryItems = await readdir(categoryDirectory);

        for (const directoryItem of directoryItems) {
            const itemPath = pathJoin(categoryDirectory, directoryItem);
            const slugSearch = directoryItem.match(/^(?<slug>\S+)\.md$/i);
            if (!slugSearch || !slugSearch.groups?.slug) continue;

            const itemStat = await lstat(itemPath);
            if (!itemStat.isFile()) continue;

            const fileContent = await readFile(itemPath, 'utf-8');
            if (fileContent.trim().length === 0) continue;

            const matterResult = matter(fileContent);
            posts.push({
                id: slugSearch.groups.slug,
                title: matterResult.data.title,
                date: toDate(matterResult.data.date, {
                    timeZone: 'Europe/Madrid',
                }),
                content: matterResult.content,
                tags: matterResult.data.tags
                    .split(',')
                    .map((tag: string) => tag.trim().toLowerCase())
                    .filter((tag: string) => tag !== ''),
            });
        }
    }

    return posts;
};

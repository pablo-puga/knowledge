import { lstat, readdir, readFile } from 'fs/promises';
import { join as pathJoin } from 'path';
import matter from 'gray-matter';
import type { Post } from '../../types';
import { getCategoriesFromFileSystem } from './categories';

const KNOWLEDGE_DIRECTORY = pathJoin(process.cwd(), 'knowledge');

export const getPostsFromFileSystem = async () => {
    const categories = await getCategoriesFromFileSystem();

    const posts: Post[] = [];

    for (const category of categories) {
        const categoryDirectory = pathJoin(KNOWLEDGE_DIRECTORY, category);
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
                category,
                title: matterResult.data.title,
                date: matterResult.data.date,
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

export const getSinglePostFromFilesystem = async (
    category: string,
    id: string,
) => {
    const postPath = pathJoin(KNOWLEDGE_DIRECTORY, category, `${id}.md`);
    const fileContent = await readFile(postPath, 'utf-8');
    const matterResult = matter(fileContent);

    return {
        id,
        category,
        title: matterResult.data.title,
        date: matterResult.data.date,
        content: matterResult.content,
        tags: matterResult.data.tags
            .split(',')
            .map((tag: string) => tag.trim().toLowerCase())
            .filter((tag: string) => tag !== ''),
    };
};

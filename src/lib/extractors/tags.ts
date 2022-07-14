import { generateRandomTagColor } from '../colors';

import { getPostsFromFileSystem } from './posts';

import type { TagDataRegister } from '../../types';

export const getTagsFromFileSystem = async () => {
    const posts = await getPostsFromFileSystem();
    const tags: Record<string, number> = {};
    posts.forEach((post) =>
        post.tags?.forEach((tag) => {
            if (tags.hasOwnProperty(tag)) ++tags[tag];
            else tags[tag] = 1;
        }),
    );
    return tags;
};

export const getColoredTagsFromFileSystem = async () => {
    const tags = await getTagsFromFileSystem();

    const tagsWithColors: TagDataRegister = {};
    for (const tag of Object.keys(tags)) {
        tagsWithColors[tag] = {
            color: generateRandomTagColor(tag),
            count: tags[tag],
        };
    }

    return tagsWithColors;
};

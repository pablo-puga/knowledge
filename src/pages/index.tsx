import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { createContext } from 'react';
import Description from '../components/Description';
import PostList from '../components/PostList';
import {
    generateRandonColorHexCode,
    generateRandonDarkColorHexCode,
} from '../lib/colors';
import { getCategoriesFromFileSystem } from '../lib/extractors/categories';
import { getPostsFromFileSystem } from '../lib/extractors/posts';
import { getTagsFromFileSystem } from '../lib/extractors/tags';
import type { SerializablePost } from '../types';

interface HomePageProps {
    posts: SerializablePost[];
    categories: Record<string, string>;
    tags: Record<string, { color: string; count: number }>;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const posts = await getPostsFromFileSystem();
    const categories = await getCategoriesFromFileSystem();
    const tags = await getTagsFromFileSystem();

    const categoriesWithColors: Record<string, string> = {};
    for (const category of categories) {
        categoriesWithColors[category] = generateRandonDarkColorHexCode();
    }

    const tagsWithColors: Record<string, { color: string; count: number }> = {};
    for (const tag of Object.keys(tags)) {
        tagsWithColors[tag] = {
            color: generateRandonColorHexCode(),
            count: tags[tag],
        };
    }

    return {
        props: {
            categories: categoriesWithColors,
            posts: posts.map((post) => ({
                id: post.id,
                category: post.category,
                title: post.title,
                date: post.date,
                tags: post.tags ?? [],
            })),
            tags: tagsWithColors,
        },
    };
};

export const CategoriesContext = createContext<Record<string, string>>({});
export const TagsContext = createContext<
    Record<string, { color: string; count: number }>
>({});

const HomePage = ({
    categories,
    posts,
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>Pablo&apos;s Knowledge</title>
                <meta
                    name="description"
                    content="This repository is a collection of commands, programming pieces or general concepts that I found myself Googling again and again"
                />
            </Head>
            <Description />
            <CategoriesContext.Provider value={categories}>
                <TagsContext.Provider value={tags}>
                    <PostList posts={posts} />
                </TagsContext.Provider>
            </CategoriesContext.Provider>
        </>
    );
};

export default HomePage;

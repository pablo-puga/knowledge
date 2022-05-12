import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { createContext } from 'react';
import Description from '../components/Description';
import PostList from '../components/PostList';
import TagData from '../components/TagData';
import { generateRandonDarkColorHexCode } from '../lib/colors';
import { getCategoriesFromFileSystem } from '../lib/extractors/categories';
import { getPostsFromFileSystem } from '../lib/extractors/posts';
import { getColoredTagsFromFileSystem } from '../lib/extractors/tags';
import type { SerializablePost, TagDataRegister } from '../types';

interface HomePageProps {
    posts: SerializablePost[];
    categories: Record<string, string>;
    tags: TagDataRegister;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const posts = await getPostsFromFileSystem();
    const categories = await getCategoriesFromFileSystem();
    const tags = await getColoredTagsFromFileSystem();

    const categoriesWithColors: Record<string, string> = {};
    for (const category of categories) {
        categoriesWithColors[category] = generateRandonDarkColorHexCode();
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
            tags,
        },
    };
};

export const CategoriesContext = createContext<Record<string, string>>({});

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
                <TagData tags={tags}>
                    <PostList posts={posts} />
                </TagData>
            </CategoriesContext.Provider>
        </>
    );
};

export default HomePage;

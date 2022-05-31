import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import CategoryData from '../components/CategoryData';
import Description from '../components/Description';
import PostList from '../components/PostList';
import TagData from '../components/TagData';
import { getColoredCategoriesFromFileSystem } from '../lib/extractors/categories';
import { getPostsFromFileSystem } from '../lib/extractors/posts';
import { getColoredTagsFromFileSystem } from '../lib/extractors/tags';
import type {
    CategoryDataRegister,
    SerializablePost,
    TagDataRegister,
} from '../types';

interface HomePageProps {
    posts: SerializablePost[];
    categories: CategoryDataRegister;
    tags: TagDataRegister;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    const posts = await getPostsFromFileSystem();
    const tags = await getColoredTagsFromFileSystem();

    return {
        props: {
            categories: await getColoredCategoriesFromFileSystem(),
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
                    content="This repository of knowlege is a collection of commands, programming pieces or general concepts that I found myself Googling again and again"
                />
            </Head>
            <Description />
            <CategoryData categories={categories}>
                <TagData tags={tags}>
                    <PostList posts={posts} />
                </TagData>
            </CategoryData>
        </>
    );
};

export default HomePage;

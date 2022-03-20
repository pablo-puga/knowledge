import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createContext } from 'react';
import PostCard from '../components/PostCard';
import {
    generateRandonColorHexCode,
    generateRandonDarkColorHexCode,
} from '../lib/colors';
import { getCategoriesFromFileSystem } from '../lib/extractors/categories';
import { getPostsFromFileSystem } from '../lib/extractors/posts';
import { getTagsFromFileSystem } from '../lib/extractors/tags';

interface SerializablePost {
    id: string;
    category: string;
    title: string;
    date: string;
    tags: string[];
}

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
        <CategoriesContext.Provider value={categories}>
            <TagsContext.Provider value={tags}>
                <ul
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 p-4 auto-rows-fr mx-auto"
                    style={{ maxWidth: '1536px' }}
                >
                    {posts.map((post) => {
                        const slug = `${post.category}/${post.id}`;
                        return (
                            <li key={slug}>
                                <PostCard {...post} slug={slug} />
                            </li>
                        );
                    })}
                </ul>
            </TagsContext.Provider>
        </CategoriesContext.Provider>
    );
};

export default HomePage;

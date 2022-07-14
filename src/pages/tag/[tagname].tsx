import Head from 'next/head';

import CategoryData from '../../components/CategoryData';
import PostList from '../../components/PostList';
import TagData from '../../components/TagData';
import { getColoredCategoriesFromFileSystem } from '../../lib/extractors/categories';
import { getPostsFromFileSystem } from '../../lib/extractors/posts';
import {
    getColoredTagsFromFileSystem,
    getTagsFromFileSystem,
} from '../../lib/extractors/tags';

import type {
    CategoryDataRegister,
    SerializablePost,
    TagDataRegister,
} from '../../types';
import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';

export const getStaticPaths: GetStaticPaths = async () => {
    const tags = await getTagsFromFileSystem();

    return {
        paths: Object.keys(tags).map((tagname) => ({
            params: {
                tagname,
            },
        })),
        fallback: false,
    };
};

interface Params extends ParsedUrlQuery {
    tagname: string;
}

interface Props {
    tagname: string;
    tags: TagDataRegister;
    categories: CategoryDataRegister;
    posts: SerializablePost[];
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
    context,
) => {
    const tagname = context.params!.tagname;

    const posts = (await getPostsFromFileSystem()).filter((post) =>
        post.tags?.includes(tagname),
    );

    return {
        props: {
            tagname,
            tags: await getColoredTagsFromFileSystem(),
            categories: await getColoredCategoriesFromFileSystem(),
            posts: posts.map((post) => ({
                id: post.id,
                category: post.category,
                title: post.title,
                date: post.date,
                tags: post.tags ?? [],
            })),
        },
    };
};

const PostByCategoryPage = ({
    tagname,
    posts,
    tags,
    categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>&quot;{tagname}&quot; posts</title>
                <meta property="og:title" content={`"${tagname}"`} />
                <meta
                    name="description"
                    content={`List of posts for the ${tagname} tag`}
                />
                <meta
                    property="og:description"
                    content={`List of posts for the ${tagname} tag`}
                />
            </Head>

            <div className="mb-4 md:mb-6 lg:mb-8">
                <h1 className="text-3xl font-medium text-center md:text-4xl lg:font-bold lg:drop-shadow-sm w-full mb-2 md:mb-0">
                    Posts for the tag &quot;{tagname}&quot;
                </h1>
            </div>
            <TagData tags={tags}>
                <CategoryData categories={categories}>
                    <PostList posts={posts} />
                </CategoryData>
            </TagData>
        </>
    );
};

export default PostByCategoryPage;

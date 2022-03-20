import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import { createContext } from 'react';
import Post from '../../components/Post';
import { generateRandonColorHexCode } from '../../lib/colors';
import {
    getPostsFromFileSystem,
    getSinglePostFromFilesystem,
} from '../../lib/extractors/posts';
import { getTagsFromFileSystem } from '../../lib/extractors/tags';
import type { IPost } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPostsFromFileSystem();
    return {
        paths: posts.map((post) => ({
            params: { category: post.category, id: post.id },
        })),
        fallback: false,
    };
};

interface Params extends ParsedUrlQuery {
    category: string;
    id: string;
}

interface Props {
    post: IPost;
    tags: Record<string, { color: string; count: number }>;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
    context,
) => {
    const params = context.params!;
    const post = await getSinglePostFromFilesystem(params.category, params.id);
    const tags = await getTagsFromFileSystem();
    const tagsWithColors: Record<string, { color: string; count: number }> = {};
    for (const tag of Object.keys(tags)) {
        tagsWithColors[tag] = {
            color: generateRandonColorHexCode(),
            count: tags[tag],
        };
    }
    return {
        props: {
            tags: tagsWithColors,
            post,
        },
    };
};

export const TagsContext = createContext<
    Record<string, { color: string; count: number }>
>({});

const PostPage = ({
    post,
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>

            <TagsContext.Provider value={tags}>
                <Post post={post} />
            </TagsContext.Provider>
        </>
    );
};

export default PostPage;

import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import Post from '../../components/Post';
import TagData from '../../components/TagData';
import {
    getPostsFromFileSystem,
    getSinglePostFromFilesystem,
} from '../../lib/extractors/posts';
import { getColoredTagsFromFileSystem } from '../../lib/extractors/tags';
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
    return {
        props: {
            tags: await getColoredTagsFromFileSystem(),
            post,
        },
    };
};

const PostPage = ({
    post,
    tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta property="og:title" content={post.title} />
                <meta
                    name="description"
                    content={post.description || post.title}
                />
                <meta
                    property="og:description"
                    content={post.description || post.title}
                />
            </Head>

            <TagData tags={tags}>
                <Post post={post} />
            </TagData>
        </>
    );
};

export default PostPage;

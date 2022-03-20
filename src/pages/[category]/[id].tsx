import type {
    GetStaticPaths,
    GetStaticProps,
    InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import type { ParsedUrlQuery } from 'querystring';
import { formatDateStringWithTimezone } from '../../lib/date';
import {
    getPostsFromFileSystem,
    getSinglePostFromFilesystem,
} from '../../lib/extractors/posts';
import type { Post } from '../../types';

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
    post: Post;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
    context,
) => {
    const params = context.params!;
    const post = await getSinglePostFromFilesystem(params.category, params.id);
    return {
        props: {
            post,
        },
    };
};

const PostPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <article>
                <h1>{post.title}</h1>
                <small>{formatDateStringWithTimezone(post.date)}</small>
            </article>
        </>
    );
};

export default PostPage;

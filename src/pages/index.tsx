import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { getPostsFromFileSystem } from '../extractors/posts';

export const getStaticProps: GetStaticProps<{
    posts: { id: string; category: string; title: string }[];
}> = async () => {
    const posts = await getPostsFromFileSystem();
    return {
        props: {
            posts: posts.map((post) => ({
                id: post.id,
                category: post.category,
                title: post.title,
            })),
        },
    };
};

const HomePage = ({
    posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <ul>
            {posts.map((post) => {
                const slug = `${post.category}/${post.id}`;
                return (
                    <li key={slug}>
                        <Link href={`/${slug}`}>
                            <a>{post.title}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default HomePage;

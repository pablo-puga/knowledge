import type { SerializablePost } from '../../types';
import PostCard from '../PostCard';

const PostList = ({ posts }: { posts: SerializablePost[] }) => {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full gap-4 sm:auto-rows-fr">
            {posts.map((post) => {
                const slug = `${post.category}/${post.id}`;
                return (
                    <li key={slug}>
                        <PostCard {...post} slug={slug} />
                    </li>
                );
            })}
        </ul>
    );
};

export default PostList;

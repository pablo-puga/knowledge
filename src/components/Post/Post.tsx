import type { IPost } from '../../types';
import Content from './Content';
import PostMeta from './PostMeta';

const Post = ({ post }: { post: IPost }) => {
    return (
        <article className="mx-auto mb-10 px-4" style={{ maxWidth: '1024px' }}>
            <h1 className="text-4xl font-medium drop-shadow-sm text-theme-purple shadow-theme-purple">
                {post.title}
            </h1>
            <PostMeta post={post} />
            <Content markdown={post.content} className="mt-4" />
        </article>
    );
};

export default Post;

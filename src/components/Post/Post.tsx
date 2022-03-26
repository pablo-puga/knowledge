import { formatDateStringWithTimezone } from '../../lib/date';
import type { IPost } from '../../types';
import Content from './Content';
import { IoFileTrayStackedSharp } from 'react-icons/io5';
import { AiFillTags } from 'react-icons/ai';
import { FaRegClock } from 'react-icons/fa';
import Tag from '../Tag';
import { useContext } from 'react';
import { TagsContext } from '../../pages/[category]/[id]';

const Post = ({ post }: { post: IPost }) => {
    const tagsContext = useContext(TagsContext);

    const getColorForTag = (tagName: string) => tagsContext?.[tagName].color;

    return (
        <article className="mx-auto mb-10 px-4" style={{ maxWidth: '1024px' }}>
            <h1 className="text-4xl font-medium drop-shadow-sm text-primary shadow-primary">
                {post.title}
            </h1>
            <section>
                <p className="mt-3 flex flex-row flex-nowrap items-center">
                    <IoFileTrayStackedSharp className="text-gray-300 inline-block" />{' '}
                    <span className="capitalize ml-2 text-sm font-medium text-gray-700">
                        {post.category}
                    </span>
                </p>
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-row flex-nowrap items-center">
                        <AiFillTags className="text-gray-300" />{' '}
                        <ul className="ml-2 flex flex-row gap-2 text-sm font-medium">
                            {post.tags.map((tagName) => (
                                <li key={tagName}>
                                    <Tag color={getColorForTag(tagName)}>
                                        {tagName}
                                    </Tag>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <small className="mt-3 flex flex-row flex-nowrap items-center">
                    <FaRegClock className="ml-0.5 text-gray-300" />{' '}
                    <time className="ml-2 text-sm text-gray-700">
                        {formatDateStringWithTimezone(post.date)}
                    </time>
                </small>
            </section>
            <Content markdown={post.content} className="mt-4" />
        </article>
    );
};

export default Post;

import Link from 'next/link';
import { formatDateStringWithTimezone } from '../../lib/date';
import { FaRegClock } from 'react-icons/fa';
import Category from './Category';
import Tag from './Tag';

interface PostCardProps {
    title: string;
    category: string;
    slug: string;
    date: string;
    tags: string[];
}

const PostCard = ({ title, category, slug, date, tags }: PostCardProps) => {
    return (
        <article className="border rounded-sm shadow-sm h-full py-2 px-3 bg-white flex flex-col text-gray-900">
            <Category>{category}</Category>
            <h1 className="mt-1 font-semibold text-lg hover:text-primary transition-colors duration-150 visited:text-quinary visited:hover:text-primary">
                <Link href={`/${slug}`}>
                    <a>{title}</a>
                </Link>
            </h1>
            {tags && tags.length > 0 && (
                <ul className="mt-1 flex flex-row gap-2 text-sm font-medium">
                    {tags.map((tagName) => (
                        <li key={tagName}>
                            <Tag>{tagName}</Tag>
                        </li>
                    ))}
                </ul>
            )}
            <small className="mt-1.5 flex flex-row flex-nowrap items-center text-xs text-gray-500">
                <FaRegClock className="mr-1" />{' '}
                <time>{formatDateStringWithTimezone(date)}</time>
            </small>
        </article>
    );
};

export default PostCard;

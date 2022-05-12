import Link from 'next/link';
import { formatDateStringWithTimezone } from '../../lib/date';
import { FaRegClock } from 'react-icons/fa';
import Category from './Category';
import Tag from '../Tag';
import { useTagDataContext } from '../TagData';

interface PostCardProps {
    title: string;
    category: string;
    slug: string;
    date: string;
    tags: string[];
}

const PostCard = ({ title, category, slug, date, tags }: PostCardProps) => {
    const tagsData = useTagDataContext();

    const getColorForTag = (tagName: string) => tagsData?.[tagName].color;

    return (
        <article
            className="border rounded-sm shadow-sm h-full py-2 px-3 bg-white text-gray-900 grid"
            style={{ gridTemplateRows: 'auto 1fr' }}
        >
            <Category className="row-span-1">{category}</Category>
            <h1 className="mt-1 font-semibold text-lg hover:text-primary transition-colors duration-150 visited:text-quinary visited:hover:text-primary row-span-2">
                <Link href={`/${slug}`}>
                    <a>{title}</a>
                </Link>
            </h1>
            {tags && tags.length > 0 && (
                <ul className="mt-1 flex flex-row gap-2 text-sm font-medium row-span-1">
                    {tags.map((tagName) => (
                        <li key={tagName}>
                            <Tag color={getColorForTag(tagName)}>{tagName}</Tag>
                        </li>
                    ))}
                </ul>
            )}
            <small className="mt-1.5 flex flex-row flex-nowrap items-center text-xs text-gray-500 row-span-1 row-start-5">
                <FaRegClock className="mr-1" />{' '}
                <time>{formatDateStringWithTimezone(date)}</time>
            </small>
        </article>
    );
};

export default PostCard;

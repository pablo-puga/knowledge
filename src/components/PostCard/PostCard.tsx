import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa';

import {
    formatDateStringWithTimezone,
    formatW3CDateWithTimezone,
} from '../../lib/date';
import Tag from '../Tag';
import { useTagDataContext } from '../TagData';

import Category from './Category';

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
            className="border-2 rounded shadow-sm h-full py-2 px-3 border-theme-purple bg-theme-black grid"
            style={{ gridTemplateRows: 'auto 1fr' }}
        >
            <Category className="row-span-1">{category}</Category>
            <h2 className="mt-1 font-semibold text-lg row-span-2">
                <Link href={`/${slug}`}>
                    <a
                        className="text-theme-purple hover:text-theme-green visited:text-theme-indigo visited:hover:text-theme-green transition-colors duration-200"
                        title={title}
                    >
                        {title}
                    </a>
                </Link>
            </h2>
            {tags && tags.length > 0 && (
                <ul className="mt-3 md:mt-1 flex flex-row gap-2 text-sm font-medium row-span-1">
                    {tags.map((tagName) => (
                        <li key={tagName}>
                            <Tag color={getColorForTag(tagName)}>{tagName}</Tag>
                        </li>
                    ))}
                </ul>
            )}
            <small className="mt-1.5 flex flex-row flex-nowrap items-center text-xs text-theme-grey-light/90 row-span-1 row-start-5">
                <FaRegClock className="mr-1" />{' '}
                <time dateTime={formatW3CDateWithTimezone(date)}>
                    {formatDateStringWithTimezone(date)}
                </time>
            </small>
        </article>
    );
};

export default PostCard;

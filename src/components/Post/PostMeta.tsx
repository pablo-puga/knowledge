import { AiFillTags } from 'react-icons/ai';
import { FaRegClock } from 'react-icons/fa';
import { IoFileTrayStackedSharp } from 'react-icons/io5';
import { MdUpdate } from 'react-icons/md';

import {
    formatDateStringWithTimezone,
    formatW3CDateWithTimezone,
} from '../../lib/date';
import Tag from '../Tag';
import { useTagDataContext } from '../TagData';

import type { IPost } from '../../types';

const IconCell = ({ children }: { children: JSX.Element }) => {
    return (
        <td className="text-center align-middle w-5 text-theme-grey-light">
            {children}
        </td>
    );
};

const MetaNameCell = ({ children }: { children: string }) => {
    return <td className="text-theme-grey-light pr-4">{children}</td>;
};

const MetaValueCell = ({
    children,
    className = undefined,
}: {
    children: string | JSX.Element;
    className?: string;
}) => {
    return <td className={className}>{children}</td>;
};

const PostMeta = ({ post }: { post: IPost }) => {
    const tagsData = useTagDataContext();

    const getColorForTag = (tagName: string) => tagsData?.[tagName].color;

    return (
        <table
            className="text-sm border-separate mt-4"
            style={{ borderSpacing: '0 10px' }}
        >
            <tbody>
                <tr>
                    <IconCell>
                        <IoFileTrayStackedSharp />
                    </IconCell>
                    <MetaNameCell>Category</MetaNameCell>
                    <MetaValueCell className="capitalize font-medium text-theme-grey-light/80">
                        {post.category}
                    </MetaValueCell>
                </tr>
                {post.tags && post.tags.length > 0 && (
                    <tr>
                        <IconCell>
                            <AiFillTags />
                        </IconCell>
                        <MetaNameCell>Tags</MetaNameCell>
                        <MetaValueCell>
                            <ul className="flex flex-row gap-2 text-sm font-medium">
                                {post.tags.map((tagName) => (
                                    <li key={tagName}>
                                        <Tag color={getColorForTag(tagName)}>
                                            {tagName}
                                        </Tag>
                                    </li>
                                ))}
                            </ul>
                        </MetaValueCell>
                    </tr>
                )}
                <tr>
                    <IconCell>
                        <FaRegClock />
                    </IconCell>
                    <MetaNameCell>Created</MetaNameCell>
                    <MetaValueCell className="font-medium text-theme-grey-light/80">
                        <time dateTime={formatW3CDateWithTimezone(post.date)}>
                            {formatDateStringWithTimezone(post.date)}
                        </time>
                    </MetaValueCell>
                </tr>
                {post.lastUpdated && (
                    <tr>
                        <IconCell>
                            <MdUpdate className="text-lg -ml-0.5" />
                        </IconCell>
                        <MetaNameCell>Last Updated</MetaNameCell>
                        <MetaValueCell className="font-medium text-theme-grey-light/80">
                            <time
                                dateTime={formatW3CDateWithTimezone(
                                    post.lastUpdated,
                                )}
                            >
                                {formatDateStringWithTimezone(post.lastUpdated)}
                            </time>
                        </MetaValueCell>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default PostMeta;

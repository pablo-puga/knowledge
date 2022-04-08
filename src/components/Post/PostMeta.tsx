import { useContext } from 'react';
import { AiFillTags } from 'react-icons/ai';
import { FaRegClock } from 'react-icons/fa';
import { IoFileTrayStackedSharp } from 'react-icons/io5';
import { formatDateStringWithTimezone } from '../../lib/date';
import { TagsContext } from '../../pages/[category]/[id]';
import type { IPost } from '../../types';
import Tag from '../Tag';

const IconCell = ({ children }: { children: JSX.Element }) => {
    return (
        <td className="text-center align-middle w-5 text-gray-400">
            {children}
        </td>
    );
};

const MetaNameCell = ({ children }: { children: string }) => {
    return <td className="text-gray-400 pr-4">{children}</td>;
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
    const tagsContext = useContext(TagsContext);

    const getColorForTag = (tagName: string) => tagsContext?.[tagName].color;

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
                    <MetaValueCell className="capitalize font-medium text-gray-700">
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
                    <MetaValueCell className="font-medium text-gray-700">
                        <time>{formatDateStringWithTimezone(post.date)}</time>
                    </MetaValueCell>
                </tr>
            </tbody>
        </table>
    );
};

export default PostMeta;

import Image from 'next/legacy/image';
import Link from 'next/link';

import type { CSSProperties } from 'react';
// import { FaSearch } from 'react-icons/fa';

const Navbar = ({
    style = undefined,
    height,
}: {
    height: number;
    style?: CSSProperties;
}) => {
    return (
        <nav
            className="fixed top-0 left-0 w-full bg-theme-purple shadow-sm shadow-theme-purple flex flex-row items-center justify-between pl-3 pr-1.5 z-40"
            style={{ ...style, height: `${height}px` }}
        >
            <div className="flex flex-row items-center">
                <Link
                    href={'/'}
                    className="text-xl flex flex-col items-center hover:drop-shadow-lg transition-shadow duration-200"
                    title="Home Page"
                    passHref={true}
                >
                    <Image
                        unoptimized={true}
                        src="/knowledge-60x60.png"
                        alt="Knowledge Logo"
                        height={height - 10}
                        width={height - 10}
                        layout="fixed"
                    />
                </Link>
                <span className="text-xl font-bold ml-3 text-theme-black">
                    Pablo&apos;s Knowledge
                </span>
            </div>
            {/* <div className="flex flex-row flex-nowrap items-center bg-gray-200 px-2 py-0.5 rounded-sm">
                <FaSearch className="text-gray-400" />
                <input
                    type="search"
                    placeholder="Search..."
                    className="bg-transparent px-2"
                />
            </div> */}
        </nav>
    );
};

export default Navbar;

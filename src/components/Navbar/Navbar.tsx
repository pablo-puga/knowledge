import Link from 'next/link';
import Image from 'next/image';
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
            className="fixed top-0 left-0 w-full bg-primary shadow-sm shadow-primary flex flex-row items-center justify-between pl-3 pr-1.5 z-40"
            style={{ ...style, height: `${height}px` }}
        >
            <div className="flex flex-row items-center">
                <Link href={'/'}>
                    <a className="text-xl flex flex-col items-center hover:drop-shadow-lg transition-shadow duration-200">
                        <Image
                            unoptimized={true}
                            src="/knowledge-60x60.png"
                            alt="Knowledge Logo"
                            height={height - 10}
                            width={height - 10}
                            layout="fixed"
                        />
                    </a>
                </Link>
                <h1 className="text-xl font-bold ml-3">
                    Pablo&apos;s Knowledge
                </h1>
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

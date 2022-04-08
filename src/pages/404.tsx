import Head from 'next/head';
import Link from 'next/link';

const _404Page = () => {
    return (
        <>
            <Head>
                <title>404 - Page not found</title>
            </Head>
            <article className="text-center mt-10 mb-20 max-w-md mx-auto">
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-medium drop-shadow text-primary">
                    404
                </h1>
                <section className="text-gray-700">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-medium">
                        Are you lost
                        <span className="text-4xl md:text-5xl lg:text-6xl">
                            ?
                        </span>
                    </p>
                    <p className="my-2 text-base md:text-lg lg:text-xl">
                        Check out the list of bits of knowledge that we have,
                        maybe you find something interesting!
                    </p>
                    <Link href="/">
                        <a className="text-lg md:text-xl lg:text-2xl underline text-primary hover:text-quinary transition-colors duration-150 font-medium">
                            Home Page
                        </a>
                    </Link>
                </section>
            </article>
        </>
    );
};

export default _404Page;

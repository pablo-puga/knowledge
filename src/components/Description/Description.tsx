import Image from 'next/image';

const Description = () => {
    return (
        <article className="flex flex-row flex-wrap items-center max-w-5xl mx-auto mb-4 md:mb-0">
            <h1 className="text-theme-purple text-3xl font-medium text-center md:text-4xl lg:font-bold lg:drop-shadow-sm w-full mb-2 md:mb-0">
                Pablo&apos;s Knowledge
            </h1>
            <div className="hidden md:block md:w-1/3">
                <Image
                    src="/knowledge-256x256.png"
                    alt="Knowledge main logo"
                    width={256}
                    height={256}
                    priority
                />
            </div>
            <div className="text-sm text-justify sm:text-base md:w-2/3 lg:text-lg">
                <p className="mb-2">
                    This repository of knowledge is a collection of commands,
                    programming pieces or general concepts that I found myself{' '}
                    <i>Googling</i> again and again, keeping them as random
                    notes in Notion or Evernote or just plain markers in my
                    browser.
                </p>
                <p>
                    One day, I got tired of that storage method so I decided to
                    build something shareable. At the time, I was fiddling with
                    Next.js so I decided to give it a try and this webpage is
                    the result of that.
                </p>
            </div>
        </article>
    );
};

export default Description;

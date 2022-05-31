import { FaGithub } from 'react-icons/fa';

const version = process.env.version;

const Footer = () => {
    return (
        <footer className="mt-8 mb-10 text-theme-grey-light/90 text-center text-sm">
            <p>
                You can also check my webpage at{' '}
                <a
                    className="hover:text-theme-green underline transition-colors duration-150"
                    href="https://pablopugaperalta.com"
                    title="My webpage"
                >
                    pablopugaperalta.com
                </a>
            </p>
            <p className="mt-1">
                Version {version} made by{' '}
                <a
                    href="https://github.com/pablo-puga"
                    className="hover:text-theme-green underline transition-colors duration-150"
                    title="My GitHub page"
                >
                    <FaGithub className="inline-block align-text-top ml-1 mr-1" />
                    pablo-puga
                </a>
            </p>
        </footer>
    );
};

export default Footer;

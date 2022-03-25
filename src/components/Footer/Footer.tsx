import { FaGithub } from 'react-icons/fa';

const version = process.env.version;

const Footer = () => {
    return (
        <footer className="mt-8 mb-10 text-gray-600 text-center text-sm">
            <p>
                You can also check my webpage at{' '}
                <a
                    className="hover:text-primary underline transition-colors duration-150"
                    href="https://pablopugaperalta.com"
                >
                    pablopugaperalta.com
                </a>
            </p>
            <p className="mt-1">
                Version {version} Made by{' '}
                <a
                    href="https://github.com/pablo-puga"
                    className="hover:text-primary underline transition-colors duration-150"
                >
                    <FaGithub className="inline-block align-text-top ml-1 mr-1" />
                    pablo-puga
                </a>
            </p>
        </footer>
    );
};

export default Footer;

import type { ReactNode } from 'react';
import Navbar from '../Navbar';

const NAVBAR_HEIGHT = 40;

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar height={NAVBAR_HEIGHT} />
            <main
                className="pt-12 mx-auto px-4"
                style={{ marginTop: `${NAVBAR_HEIGHT}px`, maxWidth: '1536px' }}
            >
                {children}
            </main>
        </>
    );
};

export default Layout;

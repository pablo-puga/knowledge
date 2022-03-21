import type { ReactNode } from 'react';
import Navbar from '../Navbar';

const NAVBAR_HEIGHT = '40px';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar style={{ height: NAVBAR_HEIGHT }} />
            <main className="pt-12" style={{ marginTop: NAVBAR_HEIGHT }}>
                {children}
            </main>
        </>
    );
};

export default Layout;

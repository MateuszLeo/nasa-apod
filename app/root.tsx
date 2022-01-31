import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from 'remix';
import type { MetaFunction } from 'remix';

import { BookmarkIcon, Header } from './components';
import globalStyles from './global.css';
import styles from './tailwind.css';

export const meta: MetaFunction = () => {
    return { title: 'Astronomy Picture of the Day' };
};

export function links() {
    return [
        { rel: 'stylesheet', href: styles },
        { rel: 'stylesheet', href: globalStyles },
    ];
}

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Header title={<Link to={'/'}>Astronomy Picture of the Day</Link>}>
                    <Link to={'/saved'}>
                        <BookmarkIcon />
                    </Link>
                </Header>
                <div className={'flex flex-col items-center mt-12'}>
                    <Outlet />
                </div>
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    );
}

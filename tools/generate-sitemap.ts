import { rm, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join as pathJoin } from 'path';
import { getPostsFromFileSystem } from '../src/lib/extractors/posts';
import { formatW3CDateWithTimezone } from '../src/lib/date';

const PUBLIC_DIR = pathJoin(__dirname, '../public');
const SITEMAP_FILE = pathJoin(PUBLIC_DIR, 'sitemap.xml');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const run = async () => {
    if (existsSync(SITEMAP_FILE)) {
        console.log('Deleting previous sitemap');
        await rm(SITEMAP_FILE);
    }

    console.log('Fetching current posts list');
    const posts = await getPostsFromFileSystem();

    console.log('Creating XML structure');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}/</loc>
    </url>
    ${posts
        .map((post) => {
            const lastmod = post.lastUpdated || post.date;
            const postXML = `<url>
        <loc>${BASE_URL}/${post.category}/${post.id}</loc>
        <lastmod>${formatW3CDateWithTimezone(lastmod)}</lastmod>
    </url>`;
            return postXML.trim();
        })
        .join('\n    ')}
</urlset>
`;
    console.log('Creating sitemap file');
    await writeFile(SITEMAP_FILE, xml);

    console.log('Sitemap creation done');
};

run();

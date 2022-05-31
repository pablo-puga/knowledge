import { rm, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join as pathJoin } from 'path';

const PUBLIC_DIR = pathJoin(__dirname, '../public');
const ROBOTS_FILE = pathJoin(PUBLIC_DIR, 'robots.txt');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const run = async () => {
    if (existsSync(ROBOTS_FILE)) {
        console.log('Deleting previous robots');
        await rm(ROBOTS_FILE);
    }

    console.log('Creating file structure');
    const text = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
    console.log('Creating robots file');
    await writeFile(ROBOTS_FILE, text);

    console.log('Robots file creation done');
};

run();

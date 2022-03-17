import { rm, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join as pathJoin } from 'path';

import { getCategoriesFromFileSystem } from '../src/extractors/categories';

const METADATA_DIR = pathJoin(__dirname, '../metadata');
const CATEGORIES_FILE = pathJoin(METADATA_DIR, 'categories.json');

const run = async () => {
    if (existsSync(CATEGORIES_FILE)) {
        console.log('Deleting previous category extraction');
        await rm(CATEGORIES_FILE);
    }

    console.log('Fetching current category list')
    const categories = await getCategoriesFromFileSystem();

    console.log('Creating new metadata extraction file');
    await writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));

    console.log('Category extraction done')
};

run();
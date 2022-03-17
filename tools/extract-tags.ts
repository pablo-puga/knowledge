import { rm, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join as pathJoin } from 'path';

import { getTagsFromFileSystem } from '../src/extractors/tags';

const METADATA_DIR = pathJoin(__dirname, '../metadata');
const TAGS_FILE = pathJoin(METADATA_DIR, 'tags.json');

const run = async () => {
    if (existsSync(TAGS_FILE)) {
        console.log('Deleting previous tag extraction');
        await rm(TAGS_FILE);
    }

    console.log('Fetching current tag list');
    const tags = await getTagsFromFileSystem();

    console.log('Creating new metadata extraction file');
    await writeFile(TAGS_FILE, JSON.stringify(tags, null, 2));

    console.log('Tags extraction done');
};

run();

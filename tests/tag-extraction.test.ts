import { describe, expect, test } from 'vitest';
import { getColoredTagsFromFileSystem } from '../src/lib/extractors/tags';

describe('tag extraction', async () => {
    const tags = await getColoredTagsFromFileSystem();

    test('tag list is defined and is a record', () => {
        expect(tags).not.toBeUndefined();
        expect(tags).not.toBeNull();
        expect(tags).toBeTypeOf('object');
    });

    test('tag list is not empty', () => {
        expect(Object.keys(tags).length).toBeGreaterThan(0);
    });

    test('each tag has a count', () => {
        Object.keys(tags).forEach((tagname) => {
            const tag = tags[tagname];
            expect(tag.count).toBeDefined();
            expect(tag.count).toBeTypeOf('number');
            expect(tag.count).toBeGreaterThan(0);
        });
    });

    test('each tag has a RBG color', () => {
        Object.keys(tags).forEach((tagname) => {
            const tag = tags[tagname];
            expect(tag.color).toBeDefined();
            expect(tag.color).toBeTypeOf('string');
            expect(tag.color).toMatch(/^#[a-f0-9]{6}$/i);
        });
    });
});

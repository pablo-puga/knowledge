import { describe, expect, test } from 'vitest';

import {
    generateRandomTagColor,
    generateRandonDarkColorHexCode,
} from '../src/lib/colors';

const HEX_COLOR_REGEXP = /^#[a-f0-9]{6}$/i;

test('A random color HEX string (e.g. #FFFFFF) should be generated', () => {
    const randomColor = generateRandonDarkColorHexCode();

    expect(randomColor).toMatch(HEX_COLOR_REGEXP);
});

describe('tag coloring', () => {
    const TAG_NAME = 'test_tag';

    const tagColor = generateRandomTagColor(TAG_NAME);

    test('A color HEX string (e.g. #FFFFFF) should be generated for a tag', () => {
        expect(tagColor).toMatch(HEX_COLOR_REGEXP);
    });

    test('A tag should always have the same color', () => {
        for (let times = 0; times < 5; times++) {
            const tagColorAgain = generateRandomTagColor(TAG_NAME);
            expect(tagColorAgain).toBe(tagColor);
        }
    });
});

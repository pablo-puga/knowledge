import tinycolor from 'tinycolor2';
import { KnowledgeError } from './error';

export const generateRandonColorHexCode = () => {
    const color = tinycolor.random().brighten(10).lighten(10);

    if (tinycolor.readability(color, '#ffffff') === 1) {
        color.darken(15);
    }

    return color.toHexString();
};

export const generateRandonDarkColorHexCode = () => {
    const color = tinycolor.random();
    if (color.isLight()) {
        return color.complement().toHexString();
    }
    return color.toHexString();
};

export const colorIsLight = (colorCode: string) => {
    const analysis = tinycolor(colorCode);
    if (!analysis.isValid()) {
        throw new KnowledgeError(`Invalid color ${colorCode}`);
    }

    return analysis.isLight();
};

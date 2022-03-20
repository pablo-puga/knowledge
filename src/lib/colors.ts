import tinycolor from 'tinycolor2';
import { KnowledgeError } from './error';

export const generateRandonColorHexCode = () => {
    return tinycolor.random().brighten().toHexString();
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

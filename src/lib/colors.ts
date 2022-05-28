import tinycolor from 'tinycolor2';

export const generateRandonDarkColorHexCode = () => {
    const color = tinycolor.random();
    if (color.isLight()) {
        return color.complement().toHexString();
    } else if (tinycolor.readability(color, '#000000') === 1) {
        color.lighten(25);
    }
    return color.toHexString();
};

export const generateRandomTagColor = (tagname: string) => {
    const total = tagname
        .split('')
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const module = total % 360;
    const color = tinycolor({ h: module, s: 100, l: 0.8 });
    return color.toHexString();
};

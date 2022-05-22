const withOpacityValue = (variable) => {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`;
        }
        return `rgb(var(${variable}) / ${opacityValue})`;
    };
};

module.exports = {
    darkMode: 'class',
    mode: 'jit',
    content: ['./src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        extend: {
            colors: {
                'theme-black': withOpacityValue('--theme-black'),
                'theme-grey': {
                    dark: withOpacityValue('--theme-grey-dark'),
                    light: withOpacityValue('--theme-grey-light'),
                },
                'theme-white': withOpacityValue('--theme-white'),
                'theme-indigo': withOpacityValue('--theme-indigo'),
                'theme-cyan': withOpacityValue('--theme-cyan'),
                'theme-green': withOpacityValue('--theme-green'),
                'theme-orange': withOpacityValue('--theme-orange'),
                'theme-pink': withOpacityValue('--theme-pink'),
                'theme-purple': withOpacityValue('--theme-purple'),
                'theme-red': withOpacityValue('--theme-red'),
                'theme-yellow': withOpacityValue('--theme-yellow'),
            },
            fontFamily: {
                roboto: ['Roboto', 'Arial', 'Noto Sans', 'sans-serif'],
                robotomono: [
                    'RobotoMono',
                    'ui-monospace',
                    'SFMono-Regular',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    'Liberation Mono',
                    'Courier New',
                    'monospace',
                ],
            },
        },
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
};

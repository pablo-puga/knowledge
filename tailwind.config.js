module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        extend: {
            colors: {
                primary: '#EF476F',
                secondary: '#FFD166',
                tertiary: '#06D6A0',
                quaternary: '#118AB2',
                quinary: '#073B4C',
            },
            fontFamily: {
                roboto: ['Roboto', 'Arial', 'Noto Sans', 'sans-serif'],
            },
        },
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
};

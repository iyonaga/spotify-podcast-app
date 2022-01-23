module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#221d29',
        gray: '#a0a0a0',
      },
      fontSize: () => {
        const min = 10;
        const max = 100;
        const baseFontsize = 16;
        const fontSize = {};

        for (let i = min; i <= max; i++) {
          fontSize[`${i}px`] = `${i / baseFontsize}rem`;
        }

        return fontSize;
      },
    },
    fontFamily: {
      sans: [
        'Hiragino Sans',
        'Hiragino Kaku Gothic ProN',
        'Yu Gothic',
        'Meiryo',
        'sans-serif',
      ],
    },
    fill: (theme) => ({
      white: theme('colors.white'),
      gray: theme('colors.gray'),
    }),
  },
  plugins: [],
};

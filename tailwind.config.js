module.exports = {
  purge: {
    content: ['./src/**/*.tsx', './pages/**/*.tsx'],
  },
  darkMode: false,
  theme: {
    screens: {
      sm: '500px',
      md: '750px',
      lg: '900px',
      xl: '1050px',
      xxl: '1300px',
    },
    extend: {
      colors: {
        primary: '#001e60', // dark blue text color
      },
      fontFamily: {
        body: ['Catamaran', 'Catamaran ExtraLight', 'Helvetica Neue', 'Arial', 'sans-serif'],
        title: [
          'Courier New',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};

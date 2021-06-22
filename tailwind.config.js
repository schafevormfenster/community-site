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
        secondary: '#4196d0',
        twitter: '#1DA1F2',
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
      width: {
        '2/1': '180%',
        '3/1': '270%',
        '4/1': '360%',
        '5/1': '450%',
        '6/1': '540%',
        '7/1': '630%',
        '8/1': '720%',
        '9/1': '810%',
        '10/1': '900%',
        '11/1': '990%',
        '12/1': '1080%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
};

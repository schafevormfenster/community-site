module.exports = {
  important: true,
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
      screens: {
        print: { raw: 'print' },
      },
      zIndex: {
        overhelpdesk: '9999999',
      },
      colors: {
        primary: '#001e60', // dark blue text color
        secondary: '#4196d0',
        secondaryDark: '#2f6a91', // https://www.sessions.edu/color-calculator/
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
      fontSize: {
        '2xs': '.6rem',
      },
      spacing: {
        '5mm': '5mm',
        '10mm': '10mm',
        '15mm': '15mm',
        '20mm': '20mm',
      },
      height: {
        '50mm': '50mm',
        '60mm': '60mm',
        '70mm': '70mm',
        '80mm': '80mm',
        '90mm': '90mm',
        '100mm': '100mm',
        '110mm': '110mm',
        '120mm': '120mm',
        '130mm': '130mm',
        '140mm': '140mm',
        '150mm': '150mm',
        '160mm': '160mm',
        '170mm': '170mm',
        '180mm': '180mm',
        '190mm': '190mm',
        '200mm': '200mm',
        '210mm': '210mm',
        '220mm': '220mm',
        '230mm': '230mm',
        '240mm': '240mm',
        '297mm': '297mm',
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
        '80/screen': '80vw',
        '90/screen': '90vw',
        '50mm': '50mm',
        '60mm': '60mm',
        '70mm': '70mm',
        '80mm': '80mm',
        '90mm': '90mm',
        '100mm': '100mm',
        '110mm': '110mm',
        '120mm': '120mm',
        '130mm': '130mm',
        '140mm': '140mm',
        '150mm': '150mm',
        '160mm': '160mm',
        '170mm': '170mm',
        '180mm': '180mm',
        '190mm': '190mm',
        '200mm': '200mm',
        '210mm': '210mm',
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            maxWidth: 'initial',
            a: {
              color: theme('colors.secondary'),
              textDecoration: 'no-underline',
            },
            p: {
              marginTop: '0',
              marginBottom: theme('space.2'),
            },
            ul: {
              marginTop: '0',
            },
            li: {
              p: {
                lineHeight: theme('lineHeight.tight'),
              },
            },
          },
        },
        lg: {
          css: {
            color: theme('colors.gray.900'),
            maxWidth: 'initial',
            a: {
              color: theme('colors.secondary'),
              textDecoration: 'no-underline',
            },
            p: {
              marginTop: '0',
              marginBottom: theme('space.2'),
            },
            h1: {
              fontWeight: theme('fontWeight.light'),
              lineHeight: theme('lineHeight.tight'),
              marginTop: theme('space.8'),
              marginBottom: theme('space.4'),
            },
            h2: {
              fontWeight: theme('fontWeight.light'),
              lineHeight: theme('lineHeight.tight'),
              marginTop: theme('space.8'),
              marginBottom: theme('space.4'),
            },
            ul: {
              marginTop: '0',
            },
            li: {
              marginTop: '0',
              marginBottom: theme('space.2'),
              lineHeight: theme('lineHeight.normal'),
              p: {
                lineHeight: theme('lineHeight.normal'),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      borderWidth: ['first'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-hyphens'),
  ],
};

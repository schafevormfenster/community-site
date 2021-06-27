module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['prettier', 'formatjs'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'formatjs/no-offset': 'error',
  },
};

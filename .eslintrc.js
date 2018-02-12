module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  plugins: ['import', 'prettier'],
  rules: {
    'no-console': 0,
        'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true
      }
    ]
  },
};

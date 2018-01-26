module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  parser: 'babel-eslint',
  plugins: ['import', 'prettier'],
  rules: {
    'no-console': 0,
  },
};

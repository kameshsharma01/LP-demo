module.exports = {
  extends: '../.eslintrc.js',
  env: {
    jest: true
  },
  plugins: ['jest'],
  rules: {
    complexity: 'off',
    'id-length': 'off',
    'max-lines': 'off',
    'max-statements': 'off',
    'no-magic-numbers': 'off',
    'no-process-env': 'off',
    'no-sync': 'off',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off'
  }
};

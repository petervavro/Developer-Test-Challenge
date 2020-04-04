module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 2, // Means error
    'import/no-extraneous-dependencies': [
      2,
      { devDependencies: ['**/test.tsx', '**/test.ts'] }
    ],
    '@typescript-eslint/indent': [2, 2],
    'import/extensions': [2, 'never'],
    '@typescript-eslint/explicit-function-return-type': 'off' // disable the rule for all files
  }
};

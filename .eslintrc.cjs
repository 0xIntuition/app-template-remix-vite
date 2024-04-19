/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  plugins: ['@typescript-eslint'], // Use the TypeScript plugin
  parser: '@typescript-eslint/parser', // Use the TypeScript parser for ESLint,
  parserOptions: {
    project: './tsconfig.json', // Set the TS-config file
  },
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    // 'plugin:@typescript-eslint/recommended', // Use TypeScript recommended rules
  ],
}

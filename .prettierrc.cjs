/** @type {import('prettier').Config} **/
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  pluginSearchDirs: ['./node_modules'],
  semi: false,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  importOrder: ['^@0xintuition/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: [
    'classProperties',
    'typescript',
    'jsx',
    'importAssertions',
  ],
}

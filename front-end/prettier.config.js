/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'cva'], // Aggiungi qui le utility functions che usi
};

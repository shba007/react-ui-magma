/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  bracketSameLine: true,
  printWidth: 200,
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
}

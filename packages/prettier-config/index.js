// https://prettier.io/docs/en/options.html

export default {
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 120,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-jsdoc"],
  importOrder: ["<BUILTIN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[.]"],
};

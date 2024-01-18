// @ts-nocheck
import { FlatCompat } from "@eslint/eslintrc";
import jsConfig from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import { defineFlatConfig } from "eslint-define-config";
import jsdocPlugin from "eslint-plugin-jsdoc";
import securityPlugin from "eslint-plugin-security";
import unicornPlugin from "eslint-plugin-unicorn";

const compat = new FlatCompat();

export default defineFlatConfig([
  // global settings
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ignores: ["dist/**", "build/**", "node_modules/**", ".git/**"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
  // flat config compatible
  jsdocPlugin.configs["flat/recommended"],
  {
    rules: {
      "jsdoc/require-property-description": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/tag-lines": "off",
    },
  },
  securityPlugin.configs["recommended"],
  {
    rules: {
      "security/detect-non-literal-fs-filename": "off",
    },
  },
  // flat config uncompatible (simple manual transformation)
  {
    plugins: { unicorn: unicornPlugin },
    rules: {
      ...unicornPlugin.configs["recommended"].rules,
      "unicorn/no-empty-file": "off",
      "unicorn/consistent-function-scoping": [
        "error",
        {
          checkArrowFunctions: false,
        },
      ],
      "unicorn/prefer-ternary": "off",
      "unicorn/prefer-event-target": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  // flat config uncompatible (FlatCompat transformation)
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended"],
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      warnOnUnsupportedTypeScriptVersion: false,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }),
  ...compat.config({
    extends: ["plugin:sort-class-members/recommended"],
  }),
  ...compat.config({
    extends: ["plugin:regexp/recommended"],
    rules: {},
  }),
  ...compat.config({
    extends: ["plugin:promise/recommended"],
    rules: {},
  }),
  ...compat.config({
    extends: ["plugin:sonarjs/recommended"],
    rules: {},
  }),
  {
    rules: {
      ...jsConfig.configs["recommended"].rules,
      ...prettierConfig.rules,
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-empty-function": "off",
      "no-unused-vars": "off",
      "no-console": "off",
    },
  },
]);

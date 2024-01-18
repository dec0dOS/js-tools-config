// @ts-nocheck
import { defineFlatConfig } from "eslint-define-config";
import nodePlugin from "eslint-plugin-n";
import globals from "globals";

import commonConfig from "./common.js";

export default defineFlatConfig([
  ...commonConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  nodePlugin.configs["flat/recommended-script"],
]);

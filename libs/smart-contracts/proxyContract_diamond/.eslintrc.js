module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    "sourceType": "module",
  },
  rules: {
    "semi": "error",
    "quotes": ["warn", "double"],
    "@typescript-eslint/no-explicit-any": "off",
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
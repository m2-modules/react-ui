module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "turbo",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePattern: ["*.js", "dist"],
};

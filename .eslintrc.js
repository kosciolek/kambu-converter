module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["airbnb-typescript", "prettier"],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        format: null,
        selector: "default",
        leadingUnderscore: "allow",
      },
    ],
    "import/extensions": "off",
    "no-use-before-define": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "react/no-unescaped-entities": "off",
    "no-param-reassign": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_.*", argsIgnorePattern: "^_.*" },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [".storybook/**", "stories/**"],
      },
    ],
  },
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      extends: ["plugin:cypress/recommended"],
      files: ["cypress/**/*.js"],
      parserOptions: {
        /* todo fix 'Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.' when linting cypress */
        project: "cypress/tsconfig.json",
      },
    },
  ],
};

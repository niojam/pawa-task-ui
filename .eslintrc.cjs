module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier-vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-tabs': 0,
    indent: 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: 2,
      },
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1,
        switchCase: 2,
        ignores: [],
      },
    ],
    'vue/no-custom-modifiers-on-v-model': 0,
    'vue/multi-word-component-names': ["off"],
    'vue/no-v-model-argument': ["off"],
    'linebreak-style': ['error', 'unix'],
    'multiline-ternary': ['error', 'always-multiline'],
    'prettier-vue/prettier': [
      'error',
      {
        singleQuote: true,
        useTabs: false,
        tabWidth: 2,
      },
    ],
  },
};

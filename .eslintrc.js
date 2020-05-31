module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
    'plugin:vue/recommended',
    'prettier/babel'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 0,
    'vue/max-attributes-per-line': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}

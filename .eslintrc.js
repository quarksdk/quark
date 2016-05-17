module.exports = {
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-undef': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow new and ignore side effects
    'no-new': 0,
    // allow curly braces on new line for methods
    'brace-style': 0,
    // require spaces before function parenthesis
    'space-before-function-paren': [2, {'anonymous': 'ignore', 'named': 'never'}],
    // allow aligned values
    'no-multi-spaces': 0,
    'key-spacing': 0,
  }
}

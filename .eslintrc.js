module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'indent': [
      'error', 2, {
        'SwitchCase': 1,
      },
    ],
    'quotes': ['error', 'single'],
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'valid-jsdoc': [
      'error', {
        'requireReturn': false,
      },
    ],
    'require-jsdoc': [
      'error', {
        'require': {
          'FunctionDeclaration': true,
          'ArrowFunctionExpression': true,
          'MethodDefinition': false,
          'ClassDeclaration': false,
          'FunctionExpression': false,
        },
      },
    ],
    'semi': ['error', 'always'],
    'no-empty': 'error',
    'no-empty-function': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
      ],
      env: {
        mocha: true,
      },
    },
  ],
};

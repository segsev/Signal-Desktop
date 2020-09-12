// For reference: https://github.com/airbnb/javascript

const rules = {
  'comma-dangle': [
    'error',
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    },
  ],

  // prevents us from accidentally checking in exclusive tests (`.only`):
  'mocha/no-exclusive-tests': 'error',

  // encourage consistent use of `async` / `await` instead of `then`
  'more/no-then': 'error',

  // it helps readability to put public API at top,
  'no-use-before-define': 'off',

  // useful for unused or internal fields
  'no-underscore-dangle': 'off',

  // useful for unused parameters
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

  // though we have a logger, we still remap console to log to disk
  'no-console': 'error',

  // consistently place operators at end of line except ternaries
  'operator-linebreak': [
    'error',
    'after',
    { overrides: { '?': 'ignore', ':': 'ignore' } },
  ],

  quotes: [
    'error',
    'single',
    { avoidEscape: true, allowTemplateLiterals: false },
  ],

  // Prettier overrides:
  'arrow-parens': 'off',
  'function-paren-newline': 'off',
  'max-len': [
    'error',
    {
      // Prettier generally limits line length to 80 but sometimes goes over.
      // The `max-len` plugin doesn’t let us omit `code` so we set it to a
      // high value as a buffer to let Prettier control the line length:
      code: 999,
      // We still want to limit comments as before:
      comments: 90,
      ignoreUrls: true,
    },
  ],

  'react/jsx-props-no-spreading': 'off',

  // Updated to reflect future airbnb standard
  // Allows for declaring defaultProps inside a class
  'react/static-property-placement': ['error', 'static public field'],

  // JIRA: DESKTOP-657
  'react/sort-comp': 'off',

  // We don't have control over the media we're sharing, so can't require
  // captions.
  'jsx-a11y/media-has-caption': 'off',

  // We prefer named exports
  'import/prefer-default-export': 'off',

  // Prefer functional components with default params
  'react/require-default-props': 'off',
};

module.exports = {
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
    'import/core-modules': ['electron'],
  },

  extends: ['airbnb-base', 'prettier'],

  plugins: ['mocha', 'more'],

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: 'tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'airbnb-typescript-prettier',
      ],
      rules,
    },
    {
      files: ['**/*.stories.tsx', 'ts/build/**'],
      rules: {
        ...rules,
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],

  rules,
};

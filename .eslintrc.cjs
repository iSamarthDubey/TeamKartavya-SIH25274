module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-const': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  },
  ignorePatterns: [
    'dist',
    'build',
    '.next',
    'node_modules',
    '*.min.js',
    '*.d.ts'
  ],
  overrides: [
    // React/Next.js specific rules for web app
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      extends: [
        'next/core-web-vitals'
      ],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
      }
    },
    // React Native specific rules for mobile app
    {
      files: ['apps/mobile/**/*.{ts,tsx}'],
      extends: [
        '@react-native-community'
      ],
      rules: {
        'react-native/no-unused-styles': 'warn',
        'react-native/split-platform-components': 'warn'
      }
    },
    // Node.js/Express specific rules for API
    {
      files: ['services/api/**/*.ts'],
      env: {
        node: true,
        browser: false
      },
      rules: {
        'no-console': 'off' // Allow console in API services
      }
    },
    // Test files
    {
      files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
      env: {
        jest: true
      },
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
};

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [...compat.extends(
  'eslint:recommended',
  'next/core-web-vitals',
  'plugin:react/recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/stylistic-type-checked',
), {
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {
      ...globals.browser,
    },
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: true,
    },
    sourceType: 'module',
  },
  plugins: {
    '@stylistic': stylistic,
    react,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    '@stylistic/type-annotation-spacing': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'arrow-spacing': 'warn',
    'comma-spacing': 'warn',
    'eol-last': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn',
    indent: ['warn', 2],
    'jsx-quotes': ['warn', 'prefer-single'],
    'key-spacing': ['warn', {
      beforeColon: false,
    }],
    'keyword-spacing': 'warn',
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': ['warn', {
      max: 1,
      maxBOF: 0,
      maxEOF: 0,
    }],
    'no-trailing-spaces': 'warn',
    'no-whitespace-before-property': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'padded-blocks': ['warn', 'never'],
    'padding-line-between-statements': ['warn', {
      blankLine: 'always',
      next: ['block', 'block-like', 'return'],
      prev: '*',
    }, {
      blankLine: 'always',
      next: '*',
      prev: ['block', 'block-like', 'const', 'import', 'let'],
    }, {
      blankLine: 'never',
      next: 'import',
      prev: 'import',
    }, {
      blankLine: 'any',
      next: ['const', 'let'],
      prev: ['const', 'let'],
    }],
    quotes: ['warn', 'single'],
    'react/jsx-tag-spacing': ['warn', {
      beforeSelfClosing: 'always',
    }],
    semi: 'warn',
    'semi-spacing': 'warn',
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': ['warn', {
      groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
    }],
    'sort-keys': 'warn',
    'space-infix-ops': 'warn',
  },
}];

export default eslintConfig;

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended',
  ),
  ...compat.plugins('prettier'),
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          indent: ['error', 2, { SwitchCase: 1 }],
          'no-tabs': 'warning',
        },

        {
          usePrettierrc: false,
        },
      ],
    },
  },
];

export default eslintConfig;

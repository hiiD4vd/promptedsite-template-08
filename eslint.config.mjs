import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'artifacts/**', 'playwright-report/**', 'test-results/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  { files: ['scripts/**/*.{mjs,cjs}'], rules: { '@typescript-eslint/no-require-imports': 'off' } },
);

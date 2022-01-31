module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'import/order': [
            'warn',
            {
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
                groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
                pathGroups: [
                    {
                        pattern: 'src/*',
                        group: 'internal',
                    },
                ],
            },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/consistent-type-imports': ['error'],
    },
    settings: {
        'import/resolver': {
            node: {
                paths: ['.'],
            },
        },
    },
    env: {
        browser: true,
        node: true,
    },
};

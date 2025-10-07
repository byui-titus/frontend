// .eslintrc.js
module.exports = {
    // Use recommended rules for React and ESLint
    extends: [
        'eslint:recommended', // Extends recommended ESLint rules
        'plugin:react/recommended', // Extends recommended React rules
        'prettier', // Extends Prettier rules for consistency
    ],
    plugins: ['react', 'prettier'], // Adds ESLint and Prettier plugins
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // Enable JSX for React projects
        },
        sourceType: 'module',
    },
    rules: {
        // Define custom rules or override existing ones
        'react/react-in-jsx-scope': 'off', // Disable automatic React import requirement
        'react/jsx-uses-react': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // Warn about console logs in production
    },
};
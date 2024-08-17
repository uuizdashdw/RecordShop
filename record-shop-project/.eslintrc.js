module.exports = {
	extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
	// plugins: ['prettier', 'unused-imports'],
	plugins: ['prettier'],
	rules: {
		'no-undef': 'error',
		// 'unused-imports/no-unused-imports': 'error',

		// 프리티어 설정
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 80,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};

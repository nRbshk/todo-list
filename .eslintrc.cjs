/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"plugin:tailwindcss/recommended",
		"eslint:recommended",
		"@vue/eslint-config-prettier",
	],
	env: {
		browser: true,
		node: true,
	},
	plugins: ["vue"],
	rules: {
		"vue/attributes-order": [
			"error",
			{
				order: [
					"DEFINITION",
					"LIST_RENDERING",
					"CONDITIONALS",
					"RENDER_MODIFIERS",
					"GLOBAL",
					["UNIQUE", "SLOT"],
					"TWO_WAY_BINDING",
					"OTHER_DIRECTIVES",
					"OTHER_ATTR",
					"EVENTS",
					"CONTENT",
				],
				alphabetical: false,
			},
		],
		"vue/max-attributes-per-line": [
			"error",
			{
				singleline: {
					max: 4,
				},
				multiline: {
					max: 4,
				},
			},
		],
		"vue/html-self-closing": [
			"error",
			{
				html: {
					void: "never",
					normal: "always",
					component: "always",
				},
				svg: "always",
				math: "always",
			},
		],
		"eol-last": ["error", "always"],
		"arrow-parens": ["error", "always"], // скобки в стрелочной функции
		"no-unused-expressions": "error", //нет неиспользуемых выражений
		// indent: ["error", 2], // use 2 spaces to indent our code
		"no-multi-spaces": ["error"], // avoid extraneous spaces
		"max-len": ["error", { code: 120 }], // обеспечивает максимальную длину строки
		"object-curly-newline": [
			"error",
			{
				ObjectExpression: { multiline: true, consistent: true },
				ObjectPattern: { multiline: true, consistent: true },
			},
		],
	},
};

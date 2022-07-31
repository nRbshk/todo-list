require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  plugins: ["simple-import-sort", "import"],
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended", "@vue/eslint-config-prettier"],
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  rules: {
    "max-len": ["error", { code: 120, ignoreUrls: true, ignorePattern: 'class="' }],
    "import/first": "error",
    "import/exports-last": "error",
    "import/no-duplicates": "error",
    "import/newline-after-import": "error",
    "no-restricted-imports": ["error", { patterns: ["../*"] }],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^@\\w"],
          ["^lodash"],
          ["^vue"],
          ["^"],
          ["^@/utils", "^@/stores", "^@/views", "^@/components", "^@/"],
          ["^\\."],
          ["^@heroicons"],
          ["^\\u0000"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
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
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};

import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jquery,
            ODSA: true,
            PARAMS: true,
            JSAV: true,
        },
    },

    rules: {
        "comma-dangle": [2, "never"],
        "no-cond-assign": 2,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-empty": 2,
        "no-extra-semi": 2,
        "no-func-assign": 2,
        "no-inner-declarations": [2, "functions"],
        "no-irregular-whitespace": 2,
        "no-negated-in-lhs": 2,
        "no-regex-spaces": 2,
        "no-sparse-arrays": 2,
        "no-unreachable": 2,
        "use-isnan": 2,
        "valid-typeof": 2,
        "no-unexpected-multiline": 2,

        "accessor-pairs": [2, {
            getWithoutSet: true,
        }],

        "block-scoped-var": 2,
        "consistent-return": 2,
        curly: [2, "multi-line"],
        "default-case": 2,
        "dot-notation": 2,
        eqeqeq: 2,
        "guard-for-in": 2,
        "no-caller": 2,
        "no-div-regex": 2,
        "no-else-return": 2,
        "no-eq-null": 2,
        "no-eval": 2,
        "no-extend-native": 2,
        "no-extra-bind": 2,
        "no-fallthrough": 2,
        "no-floating-decimal": 2,

        "no-implicit-coercion": [2, {
            boolean: true,
            number: true,
            string: true,
        }],

        "no-implied-eval": 2,
        "no-invalid-this": 0,

        "no-labels": [2, {
            allowSwitch: true,
        }],

        "no-lone-blocks": 2,
        "no-loop-func": 2,
        "no-multi-str": 2,
        "no-native-reassign": 2,
        "no-new-func": 2,
        "no-new-wrappers": 2,
        "no-new": 2,
        "no-octal-escape": 2,
        "no-octal": 2,

        "no-param-reassign": [2, {
            props: false,
        }],

        "no-redeclare": [2, {
            builtinGlobals: true,
        }],

        "no-return-assign": [2, "always"],
        "no-self-compare": 2,
        "no-sequences": 2,
        "no-throw-literal": 2,

        "no-unused-expressions": [2, {
            allowShortCircuit: true,
            allowTernary: true,
        }],

        "no-useless-call": 1,
        "no-useless-concat": 2,
        "no-void": 2,

        "no-warning-comments": [0, {
            location: "anywhere",
        }],

        "no-with": 2,
        radix: 2,
        "wrap-iife": [2, "any"],
        yoda: 2,
        strict: [1, "function"],
        "no-delete-var": 2,
        "no-label-var": 2,
        "no-shadow-restricted-names": 2,

        "no-shadow": [2, {
            builtinGlobals: true,
            hoist: "all",
        }],

        "no-undef-init": 2,
        "no-undefined": 2,
        "no-use-before-define": [2, "nofunc"],
        "array-bracket-spacing": [2, "never"],
        "block-spacing": [2, "always"],

        "brace-style": [2, "1tbs", {
            allowSingleLine: true,
        }],

        "comma-spacing": 2,
        "comma-style": [2, "last"],
        "computed-property-spacing": [2, "never"],
        "eol-last": 2,
        "func-style": [2, "declaration"],

        indent: [2, 2, {
            CallExpression: {
                arguments: "first",
            },

            FunctionExpression: {
                parameters: "first",
            },

            ObjectExpression: "first",
            VariableDeclarator: 2,
            ArrayExpression: "first",
        }],

        "key-spacing": [2, {
            beforeColon: false,
            afterColon: true,
            mode: "minimum",
        }],

        "linebreak-style": [2, "unix"],
        "new-cap": 2,
        "new-parens": 2,
        "no-array-constructor": 2,
        "no-continue": 2,
        "no-lonely-if": 2,
        "no-mixed-spaces-and-tabs": 2,
        "no-new-object": 2,
        "no-spaced-func": 2,
        "no-trailing-spaces": 2,
        "no-unneeded-ternary": 2,
        "object-curly-spacing": [2, "never"],
        "operator-linebreak": [2, "after"],
        "padded-blocks": [2, "never"],
        "quote-props": [2, "as-needed"],
        quotes: [2, "double"],

        "semi-spacing": [2, {
            before: false,
            after: true,
        }],

        semi: [2, "always"],

        "keyword-spacing": [2, {
            before: true,
            after: true,
        }],

        "space-before-blocks": 2,

        "space-before-function-paren": [2, {
            anonymous: "never",
            named: "never",
        }],

        "space-in-parens": [2, "never"],
        "space-infix-ops": 2,

        "space-unary-ops": [1, {
            words: true,
            nonwords: false,
        }],

        "wrap-regex": 2,
        "no-bitwise": 2,
    },
}];
module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": ["airbnb-base"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "no-use-before-define": ["error", { "functions": false }],
        "comma-dangle": ["error", "never"]
    }
};
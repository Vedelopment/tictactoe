module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        'no-console': 'off',
        // "indent": [
        //     "error",
        //     "tab"
        // ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": ["error", {
            "ignoreUrls": true,
            "ignoreComments": true,
            "ignoreStrings": true
        }]
    }
};

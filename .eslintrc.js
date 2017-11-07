module.exports = {
    "env": {
        "browser": true,
        "jquery": true
    },
    "globals": {
        _: false,
        cartodb: false,
        d3: false,
        TCVIZ: true,
        chroma: false
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
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
        ]
    }
};

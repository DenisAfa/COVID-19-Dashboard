module.exports = {
    "env": {
        "test": {
          "plugins": ["@babel/plugin-transform-modules-commonjs"]
        }
      },
  "presets": [
    ["@babel/preset-env", {
      /* ... */
      "exclude": ["transform-async-to-generator", "transform-regenerator"]
    }]
  ],
  /* ... */
  "plugins": [
    ["module:fast-async", { "spec": true }],
    /* ... */
    ["@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
    ],
  ]
}
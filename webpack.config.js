const path = require(`path`);

module.exports = {
  entry: [
    "./js/constants.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/mock.js",
    "./js/backend.js",
    "./js/render.js",
    "./js/wizard.js",
    "./js/setup.js",
    "./js/dialog.js",
    "./js/validation.js",
    "./js/stat.js",
    "./js/game.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

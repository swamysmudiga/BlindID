// webpack.config.js

const path = require('path');

module.exports = {
  // Other webpack configuration options...
  resolve: {
    fallback: {
      "https": require.resolve("https-browserify")
    }
  }
};
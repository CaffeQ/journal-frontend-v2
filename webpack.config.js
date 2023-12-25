const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"), // Add this line
      "assert": require.resolve("assert"), // Add this line
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'], // Add this line
    }),
  ],
  // ... other webpack configurations
};

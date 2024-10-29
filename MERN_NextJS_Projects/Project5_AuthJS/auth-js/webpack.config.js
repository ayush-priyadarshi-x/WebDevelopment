import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

module.exports = {
  // your existing config
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
};

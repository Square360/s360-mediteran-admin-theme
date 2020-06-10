const TERSER_JS_PLUGIN_CONFIG = {
  cache: true,
  parallel: true,
  sourceMap: true, // Must be set to true if using source-maps in production
  terserOptions: {
    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  }
};

export default TERSER_JS_PLUGIN_CONFIG; 
import IMAGE_LOADER_CONFIG from './webpack/loaders/image.config';
import COPY_PLUGIN_CONFIG from './webpack/plugins/copy.config';
import OPTIMIZE_CSS_ASSETS_PLUGIN_CONFIG from './webpack/plugins/optimize-css-assets.config';
import PROVIDE_PLUGIN_CONFIG from './webpack/plugins/provide.config';
import TERSER_PLUGIN_CONFIG from './webpack/plugins/terser.config';

const BUILD_CONFIG = {
  projectName: 'MediteranS360',
  pkg: require('../package.json'),
  webpack: {
    loaders: {
      imageLoader: IMAGE_LOADER_CONFIG
    },
    plugins: {
      copy: COPY_PLUGIN_CONFIG,
      optimizeCssAssets: OPTIMIZE_CSS_ASSETS_PLUGIN_CONFIG,
      provide: PROVIDE_PLUGIN_CONFIG,
      terser: TERSER_PLUGIN_CONFIG
    },
    externals: {
      'jquery': 'jQuery'
    }
  },
  entryFiles: [
    's360-mediteran.theme.js'
  ],

  getThemeFile: (extension) => {
    const THEME_JS_FILE = BUILD_CONFIG.entryFiles.filter((file) => file.indexOf('.theme.js') !== -1)[0];

    switch (extension) {
      case 'js':
        return THEME_JS_FILE;

      case 'scss':
        return THEME_JS_FILE.replace('.js', '.scss')
    }
  }
};

export default BUILD_CONFIG;
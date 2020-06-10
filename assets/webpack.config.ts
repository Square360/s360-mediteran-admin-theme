import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { format } from 'date-fns';

import * as path from 'path';
import * as webpack from 'webpack';
//import * as copyWebpackPlugin from 'copy-webpack-plugin';
import * as optimizeCSSAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import * as miniCssExtractPlugin from 'mini-css-extract-plugin';
import * as terserWebpackPlugin from 'terser-webpack-plugin';

import BUILD_CONFIG from './config/build.config';

const ENTRY_FILES: any = {};
const PLUGINS: any[] = [];
const FOLDERS_TO_COPY: any[] = [];

// Create an array of folders to copy from source folder to destination folder.
BUILD_CONFIG.webpack.plugins.copy.folders.forEach((folder) => {
  FOLDERS_TO_COPY.push({
    context: path.resolve('src', folder),
    from: '**/*',
    to: folder
  });
});

// Create the entry files object.
BUILD_CONFIG.entryFiles.forEach((file) => {
  ENTRY_FILES[file.split('.js')[0]] = path.resolve(`src/js/${ file }`);
});

// Define some plugins.
PLUGINS.push(
  new miniCssExtractPlugin({
    filename: `css/[name].min.css`,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.ProvidePlugin(BUILD_CONFIG.webpack.plugins.provide),
  new webpack.BannerPlugin({
    banner: [
      `@client: ${ BUILD_CONFIG.pkg.client }`,
      `@description: ${ BUILD_CONFIG.pkg.description }`,
      `@version: ${ BUILD_CONFIG.pkg.version }`,
      `@build: ${ format(new Date(), 'yyyy-MM-dd | HHmmss') }`
    ].join('\n')
  }),
);

// When a build of assets is run, make optimize the css and remove any artifacts
// from the dist folder.
if (process.env.NODE_ENV == 'production') {
  PLUGINS.push(new optimizeCSSAssetsWebpackPlugin(BUILD_CONFIG.webpack.plugins.optimizeCssAssets));
  PLUGINS.push(new CleanWebpackPlugin());
}

// Configure webpack.
const WEBPACK_CONFIG = {
  entry: ENTRY_FILES,
  externals: BUILD_CONFIG.webpack.externals,
  output: {
    path: path.join(`${ __dirname }/dist`),
    publicPath: '../',
    filename: `js/[name].min.js`
  },
  stats: {
    children: false
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              'targets': {
                'browsers': [
                  'last 2 versions',
                  'ie >= 11'
                ]
              },
              'modules': false
            }]
          ]
        }
      }, {
        loader: 'imports-loader?define=>false'
      }],
      exclude: /node_modules/,
    }, {
      test: /\.(css|scss)$/,
      use: [
        miniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            config: {
              path: './config/'
            }
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      include: [/fonts?/],
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `fonts/[name].[ext]`
        }
      }]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      exclude: [/fonts?/],
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: `images/[name].[ext]`
        }
      }]
    }, {
      test: /\.(gif|png|jpe?g|svg)$/,
      include: path.resolve('src/images'),
      use: [{
        loader: 'file-loader',
        options: {
          name: `images/[name].[ext]`
        }
      }, {
        loader: 'image-webpack-loader',
        options: BUILD_CONFIG.webpack.loaders.imageLoader
      }]
    }]
  },
  resolve: {
    modules: [
      path.resolve('src/js'),
      'node_modules'
    ],
    alias: {
      'src:styles': path.resolve('src/scss'),
      'src:images$': path.resolve('src/images'),
      'src:vendors': path.resolve('src/vendors')
    }
  },
  plugins: PLUGINS,
  devtool: (process.env.NODE_ENV == 'production') ? 'source-map' : 'cheap-eval-source-map',
  optimization: {
    minimizer: [
      new terserWebpackPlugin(BUILD_CONFIG.webpack.plugins.terser)
    ]
  }
};

export default WEBPACK_CONFIG;

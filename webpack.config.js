const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = [
  {
    entry: {
      background: './_dev/js/background.js',
      content: './_dev/js/content.js'
    },
    output: {
      path: path.join(__dirname, './app/js'),
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  },
  {
    entry: {
      options: './_dev/js/options/index.js'
    },
    output: {
      path: path.join(__dirname, './app/js'),
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0'],
            plugins: ['babel-plugin-transform-object-assign']
          }
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'vuex$': 'vuex/dist/vuex.js'
      }
    }
  },
  {
    entry: {
      content: './_dev/scss/content.scss',
      options: './_dev/scss/options.scss'
    },
    output: {
      path: path.join(__dirname, './app/css'),
      filename: '[name].css'
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?minimize',
              'postcss-loader',
              'sass-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new CompressionPlugin()
    ]
  }
];

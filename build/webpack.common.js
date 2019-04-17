const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** @type {import('webpack').Configuration} */
const feConfig = {
  target: 'web',
  entry: path.join(__dirname, './../public/index.tsx'),
  output: {
    path: path.resolve('dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeTagWhitespace: true,
      }
    })
  ]
};

/**@type {import('webpack').Configuration} */
const preloadConfig = {
  target: 'electron-main',
  entry: path.join(__dirname, './../preload/index.ts'),
  output: {
    path: path.resolve('dist'),
    filename: 'preload.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, './../plugin.json') },
      { from: path.join(__dirname, './../README.md') },
      { from: path.join(__dirname, './../logo.png') },
    ])
  ]
};

module.exports = {
  feConfig,
  preloadConfig
}

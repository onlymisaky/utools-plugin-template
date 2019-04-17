process.env._MODE = 'production';

const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { feConfig, preloadConfig } = require('./webpack.common');
const loaders = require('./loaders');

const plugin = require('./../plugin.json');
if (plugin.development) {
  delete plugin.development
  fs.writeFileSync(path.join(__dirname, './../plugin.json'), JSON.stringify(plugin, null, 2));
}

const configs = [
  merge(feConfig, {
    module: { rules: loaders },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new CleanWebpackPlugin(),
      new OptimizeCssAssetsPlugin()
    ]
  }),
  merge(preloadConfig, {
    module: { rules: loaders },
  })
];

module.exports = configs;

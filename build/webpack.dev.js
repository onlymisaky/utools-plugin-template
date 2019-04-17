process.env._MODE = 'development';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const merge = require('webpack-merge');
const portfinder = require('portfinder');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { feConfig, preloadConfig } = require('./webpack.common');
const loaders = require('./loaders/index');

const _feConfig = merge(feConfig, {
  module: { rules: loaders },
  devServer: {
    contentBase: path.join(__dirname, './../public'),
    clientLogLevel: 'error',
    hot: true,
    inline: true,
    historyApiFallback: true,
    quiet: true,
  }
});

const _preloadConfig = merge(preloadConfig, {
  module: { rules: loaders },
  watch: true,
});

function findPort() {
  return portfinder
    .getPortPromise({ port: 5277 })
    .then(port => {
      const plugin = require('./../plugin.json');
      const pluginStr = JSON.stringify({
        ...plugin,
        ...{
          development: {
            main: `http://localhost:${port}/index.html`,
          }
        }
      }, null, 2);
      fs.writeFileSync(path.join(__dirname, './../plugin.json'), pluginStr);
      _feConfig.devServer.port = port;
      _feConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`编译成功！请打开utools进行调试`],
          }
        })
      );
      return Promise.resolve(port);
    })
    .catch(() => {
      return Promise.reject(err);
    })
}

module.exports = new Promise((resolve, reject) => {
  return findPort()
    .then(() => {
      webpack(_preloadConfig, (err, stats) => {
        if (err) {
          return reject(err);
        }
        return resolve(_feConfig);
      })
    })
    .catch(err => {
      return reject(err)
    })
});

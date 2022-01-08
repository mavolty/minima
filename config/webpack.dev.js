const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',
  output: {
    path: paths.build,
    publicPath: '/',
  },

  // Control how source maps are generated
  devtool: 'inline-source-map',

  // Spin up a server for quick development
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: paths.build,
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})

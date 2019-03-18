const webpack = require('webpack'),
  path = require('path'),
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env, argv) => {
  let prod = argv.mode == 'production'

  let config = {
    entry: './client.js',
    output: {
      path: path.resolve('./public'),
      filename: 'react_bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    resolve: {
      alias: {
        client: path.resolve('./client/shared'),
        public: path.resolve('./public')
      }
    },
    plugins: [
      argv.analyze ? new BundleAnalyzerPlugin() : false,
      prod ? new webpack.optimize.AggressiveMergingPlugin() : false,
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/)
    ].filter(Boolean),
    optimization: {
      minimize: prod ? true : false
    },
    performance: {
      hints: false
    }
  }

  return config
}
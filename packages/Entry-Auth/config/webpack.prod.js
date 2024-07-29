const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
    allowedHosts: 'all',
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_BASE_URL': JSON.stringify(
        process.env.REACT_APP_BASE_URL,
      ),
      'process.env.REACT_APP_MAIN_URL': JSON.stringify(
        process.env.REACT_APP_MAIN_URL,
      ),
      'process.env.REACT_APP_AUTH_URL': JSON.stringify(
        process.env.REACT_APP_AUTH_URL,
      ),
      'process.env.REACT_APP_APPLY_URL': JSON.stringify(
        process.env.REACT_APP_APPLY_URL,
      ),
      'process.env.REACT_APP_ADMIN_URL': JSON.stringify(
        process.env.REACT_APP_ADMIN_URL,
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, '../dist'),
    },
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    allowedHosts: 'all',
  },
};

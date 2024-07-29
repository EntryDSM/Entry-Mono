const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
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
};

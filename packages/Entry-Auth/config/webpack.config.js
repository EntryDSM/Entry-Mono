'use strict';

const { merge } = require('webpack-merge');

const path = require('path');
const common = require('./webpack.common');
const developmentConfig = require('./webpack.dev');
const productionConfig = require('./webpack.prod');

module.exports = (_env, argv) =>
  merge(
    common,
    argv.mode === 'development' ? developmentConfig : productionConfig,
  );

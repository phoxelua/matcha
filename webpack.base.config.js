var autoprefixer = require('autoprefixer');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: 'web',

  resolve: {
    alias: {
      'jQuery': 'jquery'
    },
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'client'
    ],
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV
    }),
    new webpack.ProvidePlugin({
      $:      "jquery",
      jQuery: "jquery"
    })
  ],

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components|client\/vendor)/
      }
    ],

    loaders: [
      {
        test: /\.svg$/,
        loaders: ['babel', 'react-svg'],
        exclude: /(node_modules|bower_components|client\/styles\/font)/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss-loader', 'sass']
      },
      {
        test: /\.(woff|ttf|eot|svg)([\?]?.*)$/,
        loader: "file-loader?name=[name].[ext]",
        include: /client\/styles\/font/
      }
    ],

    noParse: /\.min\.js/
  },

  postcss: function() {
    return [autoprefixer];
  },
};

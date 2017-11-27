global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');
var nodeExternals      = require('webpack-node-externals');

var cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(false),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new ExtractTextPlugin(cssName)
];

module.exports = {
  entry: ['babel-polyfill', './src/server/server.tsx'],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins,
  output: {
    path: `${__dirname}/build/server/`,
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: true
  },
  module: {
    loaders: [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/] },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader', options: { presets: ['env'] }
          },
          {
            loader: 'awesome-typescript-loader'
          }],
        exclude: [/node_modules/, /public/] },
    ]
  },
  externals: [nodeExternals()],
  devtool: 'source-map'
};
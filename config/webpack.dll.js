const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const vendors = ['react', 'react-dom', 'react-router'];

module.exports = {
  mode: 'production',
  entry: {
    lib: vendors
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
    library: '[name]'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(process.cwd(), './dist/manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[hash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss']
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: false
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    compress: true,
    port: 8000,
    inline: true
  }
};

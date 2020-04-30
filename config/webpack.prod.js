const path = require('path');
const os = require('os');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const commonConfig = require('./webpack.common.js');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const ENV = (process.env.ENV = process.env.NODE_ENV = 'production');
const METADATA = webpackMerge(
  commonConfig({
    env: ENV
  }).metadata,
  {
    ENV: ENV,
    HMR: false
  }
);

module.exports = options => {
  const pkg = require(path.join(process.cwd(), 'package.json'));

  return webpackMerge(commonConfig({ env: ENV }), {
    mode: 'production',
    devtool: 'source-map',
    output: {
      path: path.join(process.cwd(), 'build'),
      filename: '[name].[chunkhash].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[name].[chunkhash].chunk.js'
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        })
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          }
        }
      }
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              loader: 'happypack/loader?id=jsx',
              //loaders: ['babel-loader'],
              exclude: /node_modules/
            },
            {
              test: /\.(bmp|gif|jpe?g|png)$/,
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/[name].[hash:8].[ext]'
              }
            },
            {
              exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HappyPack({
        id: 'jsx',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
        verbose: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          ENV: JSON.stringify(METADATA.ENV),
          NODE_ENV: JSON.stringify(METADATA.ENV),
          VERSION: JSON.stringify(pkg.version)
        }
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
  });
};

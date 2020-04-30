const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9230;

const METADATA = webpackMerge(
  commonConfig({
    env: ENV
  }).metadata,
  {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
  }
);

module.exports = options => {
  const pkg = require(path.join(process.cwd(), 'package.json'));

  return webpackMerge(commonConfig({ env: ENV }), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
      path: path.resolve('./dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      sourceMapFilename: '[file].map'
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              loaders: ['babel-loader'],
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
              test: /\.(scss|sass|css)$/,
              use: [
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      autoprefixer({
                        browsers: [
                          'last 2 versions',
                          'Firefox ESR',
                          '> 1%',
                          'ie >= 9',
                          'iOS >= 8',
                          'Android >= 4'
                        ]
                      })
                    ]
                  }
                },
                {
                  loader: 'sass-loader'
                }
              ]
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          ENV: JSON.stringify(METADATA.ENV),
          NODE_ENV: JSON.stringify(METADATA.ENV),
          VERSION: JSON.stringify(pkg.version)
        }
      })
    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
      },
      disableHostCheck: true
    }
  });
};

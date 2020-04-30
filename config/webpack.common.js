const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

const projectName = 'src';

module.exports = options => {
  const pkg = require(path.join(process.cwd(), 'package.json'));
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    entry: {
      main: helpers.root('./' + projectName + '/index.jsx')
    },
    resolve: {
      extensions: [' ', '.ts', '.tsx', '.js', '.jsx', '.scss']
    },
    module: {
      strictExportPresence: true,
      rules: []
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: '励推',
        chunksSortMode: function(a, b) {
          const entryPoints = ['vendor', 'main'];
          return (
            entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0])
          );
        },
        stat: isProduction,
        inject: 'body',
        template: './' + projectName + '/index.html',
        hash: true,
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              collapseInlineTagWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          : null
      }),
      new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`),
      new webpack.ProgressPlugin((percentage, msg, addInfo) => {
        const stream = process.stderr;
        if (stream.isTTY && percentage < 0.71) {
          stream.cursorTo(0);
          stream.write(
            `☺☺☺  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`
          );
          stream.clearLine(1);
        } else if (percentage === 1) {
          console.log(
            chalk.green('\n ☺☺☺ webpack: bundle build is now finished.')
          );
        }
      })
    ],
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  };
};

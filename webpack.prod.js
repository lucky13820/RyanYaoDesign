const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    main: './src/main.js',
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|ico|woff(2)?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: '[path][name].[ext]',
              context: 'src',
            },
          },
        ],
      },
      { test: /\.xml$/, loader: 'xml-loader' },
      {
        test: /\.toml$/,
        loader: '@lcdev/toml-loader',
      },
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CleanWebpackPlugin(), // cleans output.path by default
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['main', 'index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/classtopbase.html',
      inject: 'body',
      chunks: ['main', 'classtopbase'],
      filename: 'classtopbase.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/classtopbase-website.html',
      inject: 'body',
      chunks: ['main', 'classtopbase-website'],
      filename: 'classtopbase-website.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/classtopbase-dashboard.html',
      inject: 'body',
      chunks: ['main', 'classtopbase-dashboard'],
      filename: 'classtopbase-dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/air-app.html',
      inject: 'body',
      chunks: ['main', 'air-app'],
      filename: 'air-app.html',
    }),
    new BrotliGzipPlugin({
      asset: '[path].br[query]',
      algorithm: 'brotli',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliGzipPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new MiniCssExtractPlugin({
      filename: `styles/[name].css`,
    }),
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
};

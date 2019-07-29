const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin') // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    main: './src/main.js',
    index: './src/page-index/main.js',
    about: './src/page-about/main.js',
    contacts: './src/page-contacts/main.js',
    index_zh: './src/zh/page-index/main.js',
    administration: './src/page-admin/main.js',
    financial: './src/page-financial/main.js',
    recruiting: './src/page-recruiting/main.js'
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/',
              name: '[path][name].[ext]?hash=[hash:20]',
              context: 'src'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './fonts/[hash].[ext]',
              mimetype: 'application/font-woff'
            }
          }
        ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [

    new CleanWebpackPlugin(), // cleans output.path by default
    new HtmlWebpackPlugin({
      template: './src/page-index/index.html',
      inject: 'body',
      chunks: ['main', 'index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-about/index.html',
      inject: 'body',
      chunks: ['main', 'about'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-contacts/index.html',
      inject: 'body',
      chunks: ['main', 'contacts'],
      filename: 'contacts.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-admin/index.html',
      inject: true,
      chunks: ['main', 'administration'],
      filename: 'administration.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-financial/index.html',
      inject: true,
      chunks: ['main', 'financial'],
      filename: 'financial.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/page-recruiting/index.html',
      inject: true,
      chunks: ['main', 'recruiting'],
      filename: 'recruiting.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/zh/page-index/index.html',
      inject: true,
      chunks: ['main', 'index_zh'],
      filename: './zh/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    })
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}

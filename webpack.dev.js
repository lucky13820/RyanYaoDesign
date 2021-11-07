const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    main: './src/main.js',
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 7077,
    writeToDisk: false,
    headers: {
      Vary: 'Origin',
      'Access-Control-Allow-Origin': 'https://write.ryanyao.design',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
    allowedHosts: ['ryanyao.design'], // https://webpack.js.org/configuration/dev-server/#devserverwritetodisk-
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
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          // Please note we are not running postcss here
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
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
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
      template: './src/classtopbase-dashboard.html',
      inject: 'body',
      chunks: ['main', 'classtopbase-dashboard'],
      filename: 'classtopbase-dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/classtopbase-website.html',
      inject: 'body',
      chunks: ['main', 'classtopbase-website'],
      filename: 'classtopbase-website.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/air-app.html',
      inject: 'body',
      chunks: ['main', 'air-app'],
      filename: 'air-app.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      inject: 'body',
      chunks: ['main', 'about'],
      filename: 'about.html',
    }),
  ],
};

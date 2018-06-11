const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.md$/,
        exclude: /node_modules|examples/,
        loader: 'html-loader!markdown-loader?gfm=false',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|examples/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          env: {
            development: {
              plugins: [['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }],
              }]],
            },
          },
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'raw',
        include: path.join(__dirname, 'presentation/examples'),
      },
      {
        test: /\.ts$/,
        loader: 'raw',
        include: path.join(__dirname, 'presentation/examples'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'raw'],
        include: __dirname,
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
        include: path.join(__dirname, 'presentation/assets'),
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png',
        include: path.join(__dirname, 'presentation/assets'),
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/gif',
        include: path.join(__dirname, 'presentation/assets'),
      },
      {
        test: /\.jpe?g$/,
        loader: 'url-loader?mimetype=image/jpg',
        include: path.join(__dirname, 'presentation/assets'),
      },
    ],
  },
};

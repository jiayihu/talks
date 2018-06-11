const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/angular-day/dist/', // Github repository name
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
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
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=8192',
        include: path.join(__dirname, 'presentation/assets'),
      },
    ],
  },
};

const isDev = process.env.NODE_ENV === 'development';
const path = require('path');

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: {
    bundle: [
      '@babel/polyfill', // enables async-await
      './client/index.js'
    ],
    style: ['./client/style.scss']
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

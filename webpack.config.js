var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join('./', ""),
    host: "172.16.18.175",
    compress: true,
    port: 9000
  },
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','es2015','es2016','es2017']
          }
        }
      }
    ]
  }
};


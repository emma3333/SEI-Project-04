const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const environmentPlugin = process.env.NODE_ENV === 'production' ? (
  new webpack.EnvironmentPlugin({ ...process.env })
) : (
  new Dotenv()
)

module.exports = {
  entry: './src/app.js', // where our main source file is
  output: {
    path: path.resolve('public'), // our output
    filename: 'bundle.js'
  },
  devtool: 'source-maps', // shows where the error message really is
  module: { // what loader to use on what type of file
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }, // regex, $ says end of string. ? means last character is optional
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  devServer: { // devServer runs the front end. But doesn't make a public folder, doesn't build the software. It loads everything in memory. When we change a file, it changes the code in memory and refreshes the browser in local host 8000 (means we don't have to manually refresh each time a change is made). 8000 port is just for development purposes because it's quick
    contentBase: path.resolve('src'),
    hot: true,
    open: true,
    port: 8000, // port that's running the client side, frontend, react
    watchContentBase: true,
    proxy: {
      '/api': 'http://localhost:4000' // the port that's running the backend (python) proxy 8000 and 4000 when we make requests to our API.
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    environmentPlugin,
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}

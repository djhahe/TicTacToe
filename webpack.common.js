var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/dist/');
var APP_DIR = path.resolve(__dirname, 'src/app/');

var config = {
  devtool: 'cheap-module-source-map',

  entry: path.resolve(APP_DIR , 'js/components/Game.jsx'),
  output: {
    path: BUILD_DIR,
    filename: 'js/app.js',
    sourceMapFilename: 'app.map'
  },
  resolve: {
    alias : {
      TicTacToe : path.resolve(APP_DIR,'js/components/tictactoe/TicTacToe.jsx'),
      History : path.resolve(APP_DIR,'js/components/tictactoe/History.jsx'),
      Result : path.resolve(APP_DIR,'js/components/result/Result.jsx'),
      Header : path.resolve(APP_DIR,'js/components/header/Header.jsx'),
      Board : path.resolve(APP_DIR,'js/components/board/Board.jsx'),
      Cell : path.resolve(APP_DIR,'js/components/board/Cell.jsx'),
      Modal : path.resolve(APP_DIR,'js/components/common/Modal.jsx'),
      Setting : path.resolve(APP_DIR,'js/components/tictactoe/Setting.jsx'),
      TicTacToeStyle: path.resolve(APP_DIR,'style/tictactoe.scss'),
      TicTacToeFavicon : path.resolve(APP_DIR,'image/tictactoeicon.png'),
      ResetCss: path.resolve(APP_DIR,'style/_resetcss.scss'),
      
    }
  },
  module : {
    rules: [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        use:[
          'babel-loader'
        ]
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader?name=[name].[ext]&publicPath=../&outputPath=image/'
         ]
       },
       {
         test: /\.html$/,
         use: [
           'html-loader'
         ]
       }
    ]
  },
   plugins: [
    new ExtractTextPlugin('styles/app.css'),
    new HtmlWebpackPlugin({
      template: 'src/app/index.html'
    })
  ],
  watchOptions: {
    poll: true
  }
};

module.exports = config;
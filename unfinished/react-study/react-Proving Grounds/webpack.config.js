/**
 * Created by panca on 17/5/7.
 */
var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库
var HtmlwebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:3000',
      './app/index.js'          //入口文件
  ],                
  output: {
    path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置为 dist/bundle.js
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // 为webpack指定loaders
      { 
        test: /\.js$/, 
        exclude: /node_modules/ 
      },
      {
        test: /\.less$/,
        loaders: 'style-loader!css-loader!less-loader',
        include: path.resolve(__dirname, 'app')
      },
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new HtmlwebpackPlugin({
    //   title: 'React Biolerplate by Linghucong',
    //   template: path.resolve(__dirname, 'templates/index.ejs'),
    //   inject: 'body'
    // })
  ]
}

module.exports = config;
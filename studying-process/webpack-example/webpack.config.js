var Webpack = require('webpack');

module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + "/app/main.js",
	output: {
		path: __dirname + "/public",
		publicPath: "http://127.0.0.1:8080",
		filename: "bundle.js",
	},

	module: {
	  	loaders: [
	    		{test: /\.json$/,loader: "json"},
	   		{test: /\.js$/,exclude: /node_modules/,loader: 'babel'},
	    		{test: /\.css$/,loader: 'style!css?modules!postcss'}
	  	]
	},

	postcss: [
		require('autoprefixer')
	],

	plugins: [
		new Webpack.BannerPlugin("Copyright Flying Unicorns inc.")
	],

	devServer:  {
		contentBase: "./public",//本地服务器所加载的页面所在的目录
		colors: true,//终端中输出结果为彩色
		historyApiFallback: true,//不跳转
		inline: true,//实时刷新
	}
}
var path=require("path");
var webpack=require("webpack");
var {VueLoaderPlugin} = require('vue-loader');
module.exports={
	mode:'production',
	entry:{
		chat_bot:path.resolve(__dirname,"../app/app.js"),
	},
	output:{
		path:path.resolve(__dirname,"../app/dist"),
		publicPath:'/dist/',
		filename:'js/[name].bundle.js',
		chunkFilename: 'js/[name].chunk.js',//也可以配置为[name].js;
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:/node_modules/,
            },
            {
                test:/\.vue$/,
				loader:'vue-loader',
            },
            {
                test:/\.css$/,
				loader:'style-loader!css-loader',
			},
			{
                test:/\.less$/,
				loader:'style-loader!css-loader!less-loader',
			},
			{
				test:/\.scss$/,
				loader:'style-loader!css-loader!sass-loader',
			}
		]
	},
	resolve:{
		alias:{
			Page: path.resolve(__dirname, '../app/components/pages/')
		},
		modules:["node_modules"]
	},
	devServer:{
		contentBase:path.resolve(__dirname,"../app/views/"),
		port:3000,
		compress:true,
		inline:true,
		disableHostCheck: true, /*新版本会检测host是否一致*/
		proxy:{}
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin()
	]
}
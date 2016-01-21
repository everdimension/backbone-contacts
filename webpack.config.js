var webpack                = require('webpack');
var autoprefixer           = require('autoprefixer');
var postcssImport          = require('postcss-import');
var postcssVars            = require('postcss-simple-vars');
var postcssNested          = require('postcss-nested');
var postcssCalc            = require('postcss-calc');
var postcssInlineComment   = require('postcss-inline-comment');
var path                   = require('path');
var isProduction           = process.env.NODE_ENV === 'production';
var isDev                  = !isProduction;

var paths = {
	src: './src',
	dist: './dist',
	distAbsolute: __dirname + '/dist'
};

var entrySettings = [
	paths.src + '/index.js'
];

if (isDev) {
	entrySettings.unshift(
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	);
}

var config = {
	entry: entrySettings,
	output: {
		path: paths.distAbsolute,
		publicPath: '/',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
			},
			{
				test: /\.css$/,
				loader: 'style!css!postcss'
			},
			{
				test: /\.html$/,
				loader: 'html'
			}
		]
	},

	postcss: function () {
		return [postcssInlineComment, autoprefixer, postcssImport, postcssVars, postcssNested, postcssCalc];
	},

	devServer: {
		contentBase: paths.distAbsolute,
		host: '0.0.0.0',
		hot: true,
		historyApiFallback: true
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	]
};

module.exports = config;

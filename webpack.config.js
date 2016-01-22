var webpack                = require('webpack');
var ExtractTextPlugin      = require('extract-text-webpack-plugin');
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

var entrySettings;
var cssLoader;
var plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
	new webpack.ProvidePlugin({
		'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
	})
]

if (isDev) {
	entrySettings = [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		paths.src + '/index.js'
	];

	cssLoader = {
		test: /\.css$/,
		loader: 'style!css!postcss'
	};
}

if (isProduction) {
	entrySettings = {
		app: paths.src + '/index.js',
		common: ['jquery', 'backbone', 'lodash']
	};

	cssLoader = {
		test: /\.css$/,
		loader: ExtractTextPlugin.extract('style', 'css!postcss')
	};

	plugins.push(new ExtractTextPlugin('styles.css'));
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
				loader: 'babel?presets[]=es2015'
			},
			cssLoader,
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

	plugins: plugins
};

module.exports = config;

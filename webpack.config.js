const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
        index: './src/index.js'
	},
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	devServer: {
		contentBase: './dist',
		compress: true,
		port: 9000,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader','sass-loader']
            },
            {
				test: /\.(ttf|woff|woff2|eot|otf)$/,
				use: ['url-loader']
			},
		],
	},
}


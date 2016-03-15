var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var srcDir = process.cwd();
var devhost = "../";

function getEntry() {
    var jsPath = path.resolve(srcDir, 'src/scripts');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = [path.resolve(srcDir, 'src/scripts', item)]
        }
    });

    return files;
}


var config = {
    entry: getEntry(),
    output: {
        filename: "scripts/[name].js",
        path: path.join(__dirname, "release/"),
        publicPath: devhost
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.js$/,
            loader: 'babel-loader!jsx-loader?harmony'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8000&name=images/[name].[ext]'
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
            loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
        }, {
            test: /\.svg$/,
            loader: "file?name=font/[name].[ext]"
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            lib: 'scripts/lib/',
            server: 'scripts/server/',
            styles: 'styles/',
            jquery: 'scripts/lib/jquery',
            handlebars: 'scripts/lib/handlebars-v4.0.5'
        },
        root: srcDir + '/src'
    },
    plugins: [
        new ExtractTextPlugin("styles/[name].css"),
        new webpack.optimize.CommonsChunkPlugin('scripts/common.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        /*,
        new HtmlWebpackPlugin({
            filename: 'views/index.html',
            template: './src/views/index.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'views/detail.html',
            template: './src/views/detail.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['detail']
        }),
        new HtmlWebpackPlugin({
            filename: 'views/404.html',
            template: './src/views/404.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['404']
        }),
        new HtmlWebpackPlugin({
            filename: 'views/layout.html',
            template: './src/views/layout.html',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            },
            chunks: ['common']
        }),
        new HtmlWebpackPlugin({
            filename: 'views/partials/detail-content.html',
            template: './src/views/partials/detail-content.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'views/partials/header.html',
            template: './src/views/partials/header.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'views/partials/footer.html',
            template: './src/views/partials/footer.html',
            inject: false
        }), new HtmlWebpackPlugin({
            filename: 'views/partials/pbox.html',
            template: './src/views/partials/pbox.html',
            inject: false
        }), new HtmlWebpackPlugin({
            filename: 'views/pbox.html',
            template: './src/views/partials/pbox.html',
            inject: false
        }), new HtmlWebpackPlugin({
            filename: 'views/relevantbox.html',
            template: './src/views/partials/relevantbox.html',
            inject: false
        })*/
    ]
};


module.exports = config;

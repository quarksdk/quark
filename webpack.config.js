var path = require('path');
var webpack = require('webpack');
var ESLintFriendlyFormatter = require('eslint-friendly-formatter');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath        = path.resolve(__dirname);
var vendorPath      = path.join(basePath, 'node_modules');
var appPath         = path.join(basePath, 'app');
var configPath      = path.join(basePath, 'config');
var buildPath       = path.join(basePath, 'build');
var assetsPath      = path.join(buildPath, 'assets');
var resourcesPath   = path.join(basePath, 'resources');
var controllersPath = path.join(appPath, 'Controllers');
var viewPath        = path.join(appPath, 'Views');
var templatesPath   = path.join(resourcesPath, 'templates');
var stylesPath      = path.join(resourcesPath, 'styles');
var scriptsPath     = path.join(resourcesPath, 'scripts');
var imagesPath      = path.join(resourcesPath, 'images');
var fontsPath       = path.join(resourcesPath, 'fonts');
var langPath        = path.join(resourcesPath, 'langs');

module.exports = {
  entry:  {
    app: [
      path.join(controllersPath, 'App'),
    ],
  },
  output: {
    path: assetsPath,
    publicPath: 'assets/',
    filename: 'js/[name].js',
    libraryTarget: 'commonjs2',
  },
  bail: true,
  target: 'electron-renderer',
  resolve: {
    root: [ './', appPath, configPath, resourcesPath, basePath, vendorPath ],
    extensions: ['', '.js', '.json', '.vue', '.scss', '.less', '.css', '.html'],
  },
  resolveLoader: {
    root: [ vendorPath ],
    extensions: ['', '.js', '.json', '.vue', '.scss', '.less', '.css', '.html'],
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: viewPath,
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [ appPath, scriptsPath ]
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: viewPath,
      },
      {
        test: /\.js/,
        loader: 'babel',
        exclude: vendorPath,
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: [ configPath, langPath ],
      },
      {
        test:/\.scss/,
        loaders: ['style', 'css', 'sass'],
        include: stylesPath
      },
      {
        test:/\.less/,
        loaders: ['style', 'css', 'less'],
        include: stylesPath
      },
      {
        test:/\.html/,
        loader: 'vue-html',
        include: templatesPath
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        include: [ imagesPath ],
        query: {
          limit: 10000,
          name: 'img/[name].[ext]', // -[hash:7]
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        include: [ fontsPath ],
        query: {
          limit: 10000,
          name: 'fonts/[name].[ext]',
        }
      }
    ]
  },
  babel: {
    presets: ['es2015', 'stage-2'],
    plugins: ['transform-runtime'],
    comments: false
  },
  vue: {
    autoprefixer: {
      browsers: 'last 2 versions',
    },
    cssSourceMap: true,
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      less: ExtractTextPlugin.extract('css!less'),
      scss: ExtractTextPlugin.extract('css!sass')
    }
  },
  eslint: {
    formatter: ESLintFriendlyFormatter
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    // new webpack.EnvironmentPlugin([
    //   'NODE_ENV'
    // ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.DedupePlugin(), // don't use in watch mode
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(buildPath, 'index.html'),
      template: path.join(templatesPath, 'app.html'),
      inject: true
    }),
  ],
  devtool: '#source-map',
  devServer: {
    publicPath: '/assets/',
    contentBase: buildPath,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      chunks: false,
    },
  }
}

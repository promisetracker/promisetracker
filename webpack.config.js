const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

var providePluginList = {
  $: 'jquery',
  jQuery: 'jquery',
  'window.jQuery': 'jquery',
  Popper: ['popper.js', 'default'],
  Alert: 'exports-loader?Alert!bootstrap/js/src/alert',
  Button: 'exports-loader?Button!bootstrap/js/src/button',
  Carousel: 'exports-loader?Carousel!bootstrap/js/src/carousel',
  Collapse: 'exports-loader?Collapse!bootstrap/js/src/collapse',
  Dropdown: 'exports-loader?Dropdown!bootstrap/js/src/dropdown',
  Modal: 'exports-loader?Modal!bootstrap/js/src/modal',
  Popover: 'exports-loader?Popover!bootstrap/js/src/popover',
  Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/src/scrollspy',
  Tab: 'exports-loader?Tab!bootstrap/js/src/tab',
  Tooltip: 'exports-loader?Tooltip!bootstrap/js/src/tooltip',
  Util: 'exports-loader?Util!bootstrap/js/src/util'
};

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, './assets'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader?name=assets/[name].[ext]']
      },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { modules: false, sourceMaps: true } },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader', query: { sourceMaps: true } }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env'] }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.ProvidePlugin(providePluginList),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: 'http://localhost:8080/',
        files: ['_site/*.*']
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      '**': 'http://localhost:4000'
    },
    contentBase: './assets'
  }
};
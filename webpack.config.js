const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/bookmarks.html',
      filename: 'bookmarks.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/detail-team.html',
      filename: 'detail-team.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/home.html',
      filename: 'templates/home.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/match.html',
      filename: 'templates/match.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/nav.html',
      filename: 'templates/nav.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/team.html',
      filename: 'templates/team.html',
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'England League 2021',
      short_name: 'EN League 2021',
      description: 'Aplikasi sederhana yang berisi informasi sepak bola Liga Inggris 2021.',
      background_color: '#fff',
      theme_color: '#42A5F5',
      display: 'standalone',
      start_url: './index.html',
      gcm_sender_id: '<< Your GCM Sender ID >>',
      icons: [
        {
          src: path.resolve('src/assets/icons/icon.png'),
          sizes: [72, 96, 128, 192, 256, 512],
        },
      ],
    }),
    new FaviconsWebpackPlugin('./src/assets/icons/icon.png'),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './src/sw.js'),
    }),
  ],
};

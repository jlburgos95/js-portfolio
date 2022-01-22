const path = require('path');
//HTML Webpack: npm install html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Mini CSS Extract: npm install mini-css-extract-plugin css-loader -D
//Stylus Loader: npm install stylus stylus-loader -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Copy Webpack: npm install url-loader file-loader -D
const CopyWebpackPlugin = require('copy-webpack-plugin');
//CSS Minimizer y Terser:  npm install css-minimizer-webpack-plugin terser-webpack-plugin -D
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); //Optimización de Javascript

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //Nos aseguramos que en cualquier localizacióin se encuentre el proyecto
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.js'],
    //Se usan alias para hacer referencia a otras ubicaciones en el sistema de archivos y sea más fácil buscar
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        //Checar documentación para otra manera que no requiere plugins: https://webpack.js.org/guides/asset-modules/
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            mimetype: 'application/font-woff',
            name: '[name].[contenthash].[ext]',
            outputPath: './assets/fonts',
            publicPath: '../assets/fonts',
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: 'assets/images',
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

/*Ejecución: npx webpack --mode production --config webpack.config.js
    Colocar comando en los scripts
    Nota: no es necesario el parámetro --config
*/

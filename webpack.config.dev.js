//================= Archivo de configuración para el modo de desarrollo ===================

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotEnv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //Nos aseguramos que en cualquier localizacióin se encuentre el proyecto
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },
  mode: 'development',
  devtool: 'source-map',
  /*source-map permite observar con devTools (Chrome) en sources, links de cada parte del main.js generado
  a la parte del código que hicimos correspondiente, de esta manera es mucho más legible y podemos debuggear mejor*/

  //watch: true, //Para observar constantemente cambios y compilar automaticamente
  //No es necesario usar junto con devServer ya que por si solo cumple con esa función
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
    new DotEnv(),
    //Instalar Bundle Analyzer: npm install webpack-bundle-analyzer -D
    new BundleAnalyzerPlugin(),
    //Generar archivo de análisis del proyecto: npx webpack --profile --json > stats.json
    //Leer estadísticas del archivo generado: npx webpack-bundle-analyzer stats.json
  ],
  //Instalar servidor de desarrollo: npm install webpack-dev-server -D
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3006,
  },
};

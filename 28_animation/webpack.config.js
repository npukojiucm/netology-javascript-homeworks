const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   entry: './index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].js',
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './index.html',
//     }),
//     new MiniCssExtractPlugin({
//       filename: '[name].css',
//     }),
//   ],

//   module: {
//     rules: [
//       {
//         test: /\.png/,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//     ],
//   },
// };

const index = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

const collapse = {
  entry: './src/collapse/index.js',
  output: {
    path: path.resolve(__dirname, 'dist', 'collapse'),
    filename: 'index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/collapse/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};

// const task3 = {
//   entry: './src/3-task/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist', '3-task'),
//     filename: 'index.js',
//   },

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/3-task/index.html',
//       filename: 'index.html',
//     }),
//     new MiniCssExtractPlugin({
//       filename: 'index.css',
//     }),
//   ],

//   module: {
//     rules: [
//       {
//         test: /\.(png|jpe?g|gif|svg)/,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//     ],
//   },
// };

module.exports = [index, collapse];

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

// local constants
const sourcePath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production';

  return {
    entry: [
      `${sourcePath}/index.js`,
    ],
    devtool: 'source-map',
    output: {
      filename: `craftact.${isProd ? 'min.[hash:12]' : 'dev'}.bundle.js`,
      path: outputPath,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: outputPath,
      hot: true,
      port: 3000,
      open: true,
    },
    mode: isProd ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.join(sourcePath, 'index.html') }),
      !isProd && new HotModuleReplacementPlugin(),
    ].filter((item) => (!!item)),
  };
};

const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleStatsWebpackPlugin } = require("bundle-stats-webpack-plugin");
const webpack = require('webpack');


module.exports = merge(common, {
  mode: "production",
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    // Stats bundle
    new BundleStatsWebpackPlugin(),
    // API backend ONLINE
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(
        "http://ec2-54-160-66-108.compute-1.amazonaws.com:4000"
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          {
            loader: "css-loader",
            options: { importLoaders: 3 },
          },
          "postcss-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  stats: {
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    builtAt: true,
    hash: true,
  },

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

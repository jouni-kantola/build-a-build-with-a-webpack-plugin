const path = require("path");
const webpack = require("webpack");

const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const TemplatedAssetsWebpackPlugin = require("templated-assets-webpack-plugin");
const templatedAssetsConfig = require("./templated-assets-config");

const publicPath = "/";

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: ["jquery"]
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.join(__dirname, "dist"),
    publicPath: publicPath
  },

  module: {
    rules: [
      {
        test: /.jpg$/,
        exclude: /node_modules/,
        loader: ["./loaders/ascii-image-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
          plugins: ["syntax-dynamic-import"]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "runtime"],
      minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ChunkManifestPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      exclude: ["runtime", "styles.css"],
      append: `\n//# sourceMappingURL=${publicPath}/[url]\n`
    }),
    new TemplatedAssetsWebpackPlugin(templatedAssetsConfig)
  ]
};

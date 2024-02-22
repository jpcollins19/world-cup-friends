// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        // loader: "awesome-typescript-loader",

        // test: /\.js$/,
        // test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          // presets: ["@babel/preset-react"],
          presets: [
            "@babel/preset-react",
            ["@babel/preset-env", { targets: { node: "current" } }],
            "@babel/preset-typescript",
          ],
        },
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      // {
      //   test: /\.tsx?$/,
      //   loader: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};

const { resolve, join } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  entry: {
    main: resolve("./src/index.tsx")
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: ["awesome-typescript-loader?module=es6"],
        include: [
          join(__dirname, "src"),
          join(__dirname, "node_modules/react-intl"),
          join(__dirname, "node_modules/intl-messageformat"),
          join(__dirname, "node_modules/intl-messageformat-parser")
        ]
      },
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: !isDevelopment }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};

module.exports = config;

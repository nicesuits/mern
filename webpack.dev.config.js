const webpack = require("webpack");

module.exports = {
  entry: ["webpack-dev-server/client/?http://localhost:8080", "./src/App.jsx"],
  output: {
    publicPth: "./static/",
    path: __dirname + "./static",
    filename: "app.bundle.js"
  },
  devtool: "#sourcemap",
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loader: ["babel-loader", "react-hot-loader"]
      }
    ]
  },
  devServer: { hot: true },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = {
  entry: "./src/App.jsx",
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
        loader: []
      }
    ]
  }
};

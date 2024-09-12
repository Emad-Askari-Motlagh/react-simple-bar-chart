// webpack.config.js
const path = require("path");

module.exports = {
  // other configuration...
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "SimpleChart.js",
    library: "react-simple-bar-chart",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // other loaders...
    ],
  },
};

//webpack.config.js
const path = require('path');

module.exports = {
  // production or development
  mode: "development",

  // inline-source-map -> Possible choice when publishing a single file
  // (none) -> Recommended choice for production builds with maximum performance.
  devtool: "inline-source-map",
  target: "node",
  entry: {
    main: "./src/validator.ts",
  },
  output: {
    library: 'mylib',
    path: path.resolve(__dirname, './dist'),
    filename: "[name]-bundle.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};

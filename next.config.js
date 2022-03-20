const path = require("path");

// It 'll create a handy report what's in our bundle when build is completed
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");

//minify CSS and extract it into a separate file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  webpack(config, options) {
    const { dev } = options;
    if (!dev) {
      //let us see original code when debugging in browser
      config.devtool = "source-map";
      config.plugins = [
        ...config.plugins,
        new WebpackBundleAnalyzer.BundleAnalyzerPlugin({
          analyzerMode: "static",
        }),
        // the file name will change only when our CSS changes(hashing will prevent cache Busting)
        new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      ];
      config.module.rules.push({
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      });
    }

    config.module.rules.push({
      test: /\.(svg|png|jpg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "imgs",
        },
      },
    });
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ["babel-loader"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

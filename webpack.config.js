const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: ["./src/App.jsx"],
  },
  module: {
    rules: [
      {
        test: (m) => {
          return /\.(js|jsx)$/.test(m);
        },
        exclude: (m) => {
          return /node_modules/.test(m);
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: (m) => {
          return /\.css$/.test(m);
        },
        exclude: (m) => {
          return /node_modules/.test(m);
        },
        use: ["style-loader", "css-loader"],
      },
      {
        test: (m) => {
          return /\.(png|jp(e*)g|svg)$/.test(m);
        },
        exclude: (m) => {
          return /node_modules/.test(m);
        },
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [],
  output: {
    filename: "kom-test.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: "/",
  },
};

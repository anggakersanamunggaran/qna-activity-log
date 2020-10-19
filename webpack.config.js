const path = require('path');
const pkg = require('./package.json');

const env = process.env.WEBPACK_ENV;

let libName = pkg.name;
let outputFile, envMode;

if (env === 'build') {
  envMode = 'production';
  outputFile = libName + '.min.js';
} else {
  envMode = 'development';
  outputFile = libName + '.js';
}

const config = {
  mode: envMode,
  entry: __dirname + '/src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  }
};

module.exports = config;

const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.wasm$/,
        type: "asset/inline",
        generator: {
          dataUrl: (content) => {
            return `${content.toString('base64')}`
          },
        },
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'dnsspatialdiscovery',
      type: 'umd'
    },
    globalObject: 'this'
  }
};
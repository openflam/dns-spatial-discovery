const path = require('path');

module.exports = {
    entry: './test/axios-mock/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'test', 'axios-mock', 'dist'),
        library: {
            name: 'axiosmock',
            type: 'umd'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: 'development'
};
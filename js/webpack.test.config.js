const path = require('path');

module.exports = {
    entry: './test/axios-mock/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'test', 'axios-mock', 'dist'),
        library: {
            name: 'axiosmock',
            type: 'umd'
        }
    }
};
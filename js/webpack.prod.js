const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    // Production-specific configuration
    plugins: [
        // Define plugin for logger level
        new webpack.DefinePlugin({
            LOGGER_LEVEL: JSON.stringify('error')
        })
    ]
});

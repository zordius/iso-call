module.exports = {
    context: __dirname,
    entry: './app.js',
    output: {
        filename: 'CMDConsole.js',
        path: '/',
        publicPath: '/js/',
        library: 'CMDConsole'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader?optional=runtime',
            exclude: /node_modules/
        }]
    },
    resolve: {
        alias: {
            "iso-call/polyfill": "babel-core/polyfill",
            request: 'browser-request'
        }
    }
};

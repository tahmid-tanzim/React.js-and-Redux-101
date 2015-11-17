module.exports = {
    entry: "./app-client.js",
    output: {
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules|tests|app-server.js)/,
                loader: 'babel'
            }
        ]
    }
};
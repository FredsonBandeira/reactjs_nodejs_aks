const path = require('path');

module.exports = {
  mode: 'development', // ou 'production' conforme necessário
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        use: []
      }
    ]
  },
  target: 'node',
  externals: [
    'express', 'path', 'events', 'stream', 'buffer', 'fs', 'net', 'http', 'process', 'url', 'timers', 'zlib', 'querystring', 'tls','mysql2','cors'
  ],
  resolve: {
    extensions: ['.js', '.mjs']
  }
};

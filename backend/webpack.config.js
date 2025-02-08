const path = require('path');
module.exports = {
 mode: 'production',
 entry: './services/index.js',
 output: {
 path: path.join(__dirname, 'server'),
 publicPath: '/',
 filename: 'server.js',
 },
 target: 'node',
};
const clientConfig = require('./packages/client/webpack.config.prod');
const serverConfig = require('./packages/server/webpack.config.prod');

module.exports = [clientConfig, serverConfig];

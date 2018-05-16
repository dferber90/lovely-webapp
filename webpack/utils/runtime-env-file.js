// This module holds the ENV_FILE or its fallback.
// See the runtime-env.js file for more information
module.exports = process.env.ENV_FILE || '.runtime.dev.env';

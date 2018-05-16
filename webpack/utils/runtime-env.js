// When starting the final build, the environment needs to hold specific
// environment variables.
//
// During development, we also need to define these variables.
// We regularily need differing sets of variables:
//   - the set to start development locally while using an external prisma db
//   - the set to run e2e tests locally while using a local prisma db
//   - maybe more
//
// To solve this, a ENV_FILE variable can be set which holds the name of a
// .env file at the project root. That file contains the environment variables
// which will be made available to the development build.
//
// Example values of ENV_FILE are `.runtime.dev.env` or `.runtime.e2e.env`
//
// The environment variables from the runtime configs should never be
// used in the webpack build itself. Those variables are the ones the server
// will be able to set manually when running the applications (api & frontend).

/* eslint-disable import/no-extraneous-dependencies */
const envfile = require('envfile');
const envFile = require('./runtime-env-file');

module.exports = envfile.parseFileSync(`./${envFile}`);

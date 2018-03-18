// webpack-node-server-plugin does not support adding a custom cwd yet
//
// Issue: https://github.com/blaugold/webpack-node-server-plugin/issues/1
//
// To work around this, I coded the feature in myself by modifying one line
// in that file.
// This script gets exectued after every yarn installation and copies the modified
// file into node_modules, so that we can use the feature even before it is
// officially added.

// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs-extra');

fs.copySync(
  './scripts/data/node-server-plugin.js',
  './node_modules/webpack-node-server-plugin/src/node-server-plugin.js'
);

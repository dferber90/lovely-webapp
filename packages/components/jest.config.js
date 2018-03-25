module.exports = {
  verbose: false,
  globals: {
    DEV: false,
  },
  setupFiles: ['./jest/setup-env.js', './jest/setup-enzyme.js'],
  setupTestFrameworkScriptFile: './jest/setup-test-framework-scripts.js',
};

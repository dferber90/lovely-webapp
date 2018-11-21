module.exports = {
  // This config is necessary so that when running "yarn test" from the root,
  // all packages will respect their ".babelrc" files.
  // Otherwise the tests will break!
  //
  // https://babeljs.io/docs/en/options#babelrcroots
  babelrcRoots: [
    // Keep the root as a root
    ".",
  
    // Also consider monorepo packages "root" and load their .babelrc files.
    "./packages/*"
  ]
}
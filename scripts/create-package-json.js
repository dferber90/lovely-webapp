/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require, no-console */

// For now.sh to be able to run the app, we need a single `package.json`
// file with a `start` script.
// now.sh will also install dependencies listed in package.json, but it doesn't
// support workspaces. Unfortunately, the bundle we're creating uses workspaces.
// So we need to pretend that there is a flat bundle for `now.sh`
//
// To achieve this, we read the workspace locations from the main package.json,
// then we merge the dependencies of each package.
// This merge is dumb and doesn't respect version requirements of packages.
// So in case two packages want the differing versions, the version of the latest
// package would win.
//
// To avoid the issue, we fail the build in case different packages have
// the same dependency with different version requirements.

const fs = require('fs-extra');
const glob = require('glob');
const flatten = require('lodash.flatten');
const omit = require('lodash.omit');

const { workspaces } = require('../package.json');

// We are looping over all workspace packages.
// More accurately, we should start with the dependencies of `server`,
// add them, then add the dependencies of workspace-packages used by
// `server` and recurse for workspace-dependencies used by them.
// But that's too much effort for a workaround, so for now, we just
// use all of them, always.
const packageLists = workspaces.map(workspace => glob.sync(workspace));
const pkgPaths = flatten(packageLists);

const pkgs = pkgPaths
  .map(pkgPath => require(`../${pkgPath}/package.json`), {})
  // Allows packages to be excluded from this dependency gathering
  // At the moment only the api uses this, as it ends up as its own bundle
  .filter(pkg => !pkg.excludeFromWorkspaceFlattening);

const allDeps = pkgs.reduce((acc, pkg) => {
  if (!pkg.dependencies) return acc;
  Object.entries(pkg.dependencies).forEach(([name, version]) => {
    if (acc[name] && acc[name] !== version) {
      console.error(
        `Incompatible version of ${name} (${version} and ${
          acc[name]
        }) in workspace packages (${pkg.name} and another one)`
      );
      process.exit(1);
    }
  });
  Object.assign(acc, pkg.dependencies);
  return acc;
}, {});

const excludedPkgs = pkgs.map(pkg => pkg.name);

const pkg = {
  name: 'wa',
  private: true,
  scripts: { start: 'NODE_ENV=production node server.js' },
  dependencies: omit(allDeps, excludedPkgs),
};

fs.outputFileSync(
  './dist-production/frontend/package.json',
  JSON.stringify(pkg, null, 2)
);

fs.copySync('./yarn.lock', './dist-production/frontend/yarn.lock');

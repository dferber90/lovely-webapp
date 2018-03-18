'use strict';
var __extends =
  (this && this.__extends) ||
  function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype =
      b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
  };
var process_1 = require('./process');
var child_process_1 = require('./child_process');
var rxjs_1 = require('@reactivex/rxjs');
/**
 * Plugin which starts a node script after compilation has finished.
 *
 * The first emitted asset with extension `.js` will be executed.
 * All standard streams are inherited by the spawned process.
 * If webpack is in watch mode and emits a new compilation the script is stopped and the new bundle
 * started.
 * If webpack is run for a one of compilation, the exit code of the script will be returned.
 * Should the script exit with a code other than 0, the plugin tries to restart it.
 * If the script is not able to stay up for a certain time (default: 10 seconds), the plugin will
 * give up restarting it after some set number of tries (default: 3 times).
 */
// tslint:disable-next-line
var _NodeServerPlugin = (function() {
  /**
   *
   * @param config.retries - Times the plugin tries to restart the script (3).
   * @param config.minUpTime - Times in seconds script has to stay up the reset retries (10).
   * @param config.retryDelay - Delay restring script after crash in seconds (1).
   * @param config.compilationDebounce - Debounce compilation emits by time in milli seconds (300).
   */
  function _NodeServerPlugin(
    process,
    child_process, // tslint:disable-line
    config
  ) {
    if (config === void 0) {
      config = {};
    }
    this.process = process;
    this.child_process = child_process;
    /** @internal */
    this.$onDone = new rxjs_1.Subject();
    this.initFromConfig(config);
    this.setupPipeline();
  }
  _NodeServerPlugin.prototype.initFromConfig = function(config) {
    this.retries = defaultNumber(config.retries, 3);
    this.retryDelay = defaultNumber(config.retryDelay, 1);
    this.minUpTime = defaultNumber(config.minUpTime, 10);
    this.compilationDebounce = defaultNumber(config.compilationDebounce, 300);
  };
  _NodeServerPlugin.prototype.setupPipeline = function() {
    var _this = this;
    this.$pipeline = this.$onDone
      .debounceTime(this.compilationDebounce)
      .let(this.getScriptPath())
      .filter(function(scriptPath) {
        return !!scriptPath;
      })
      .switchMap(function(scriptPath) {
        return _this.runScript(scriptPath);
      });
  };
  _NodeServerPlugin.prototype.apply = function(compiler) {
    var _this = this;
    // Register callback to start server when compiler is done.
    compiler.plugin('done', function(stats) {
      return _this.$onDone.next(stats);
    });
    // Detect whether compiler is in watch mode.
    compiler.plugin('run', function(_, cb) {
      _this.setWatchMode(false);
      cb();
    });
    compiler.plugin('watch-run', function(_, cb) {
      _this.setWatchMode(true);
      cb();
    });
    // tslint:disable-next-line
    this.$pipeline.subscribe(
      function() {},
      function(code) {
        return _this.process.exit(code);
      }
    );
  };
  _NodeServerPlugin.prototype.setWatchMode = function(watch) {
    this.watchMode = watch;
  };
  _NodeServerPlugin.prototype.runScript = function(scriptPath) {
    var _this = this;
    var $exitAfterMinUpTime = new rxjs_1.Subject();
    return this.spawnScript(scriptPath)
      .switchMapTo(rxjs_1.Observable.timer(this.minUpTime * 1000))
      .do(function() {
        return $exitAfterMinUpTime.next(true);
      })
      .retryWhen(function(errors) {
        return errors
          .do(function() {
            return $exitAfterMinUpTime.next(false);
          })
          .let(_this.shouldRetry($exitAfterMinUpTime))
          .delayWhen(function() {
            return rxjs_1.Observable.timer(_this.retryDelay * 1000);
          });
      })
      .catch(function(err) {
        return _this.watchMode
          ? rxjs_1.Observable.empty()
          : rxjs_1.Observable.throw(err);
      });
  };
  _NodeServerPlugin.prototype.shouldRetry = function($exitAfterMinUpTime) {
    var _this = this;
    var hasRetriesLeft = $exitAfterMinUpTime
      .scan(function(retriesLeft, success) {
        return success ? _this.retries : retriesLeft - 1;
      }, this.retries)
      .map(function(retriesLeft) {
        return retriesLeft >= 0;
      });
    return function(errors) {
      return errors
        .withLatestFrom(hasRetriesLeft)
        .do(function(_a) {
          var err = _a[0],
            retry = _a[1];
          if (!_this.watchMode || !retry) {
            throw err;
          }
        })
        .mapTo(void 0);
    };
  };
  _NodeServerPlugin.prototype.getScriptPath = function() {
    return function(statsObs) {
      return statsObs
        .map(function(stats) {
          return stats.compilation.assets;
        })
        .map(function(assets) {
          var bundleName = Object.keys(assets).filter(function(fileName) {
            return fileName.match(/\.js$/);
          })[0];
          return assets[bundleName];
        })
        .map(function(asset) {
          return asset.existsAt;
        });
    };
  };
  _NodeServerPlugin.prototype.spawnScript = function(path) {
    var _this = this;
    return new rxjs_1.Observable(function(obs) {
      var childProcess = _this.child_process.spawn('node', [path], {
        stdio: 'inherit',
        cwd: 'dist-development',
      });
      childProcess.on('close', function(code) {
        if (code !== 0) {
          obs.error(code);
          return;
        }
        obs.complete();
      });
      obs.next();
      return function() {
        return childProcess.kill('SIGTERM');
      };
    });
  };
  return _NodeServerPlugin;
})();
exports._NodeServerPlugin = _NodeServerPlugin;
function defaultNumber(option, def) {
  if (option === undefined) {
    return def;
  }
  return option;
}
var NodeServerPlugin = (function(_super) {
  __extends(NodeServerPlugin, _super);
  /**
   * Default for each option in brackets.
   * @param config.retries - Times the plugin tries to restart the script (3).
   * @param config.minUpTime - Times in seconds script has to stay up the reset retries (10).
   * @param config.retryDelay - Delay restring script after crash in seconds (1).
   * @param config.compilationDebounce - Debounce compilation emits by time in milli seconds (300).
   */
  function NodeServerPlugin(config) {
    if (config === void 0) {
      config = {};
    }
    return (
      _super.call(
        this,
        new process_1.ProcessModule(),
        new child_process_1.ChildProcessModule(),
        config
      ) || this
    );
  }
  return NodeServerPlugin;
})(_NodeServerPlugin);
exports.NodeServerPlugin = NodeServerPlugin;
//# sourceMappingURL=node-server-plugin.js.map

(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');

  /**
   * @name fs
   * @type {Object}
   */
  var fs = require('fs-extra');
  //var $ = require('./gulpfile.tree');

  //# Compose absolute url to module:
  //var urlToMainModule = require.resolve('./').split('index.js').join('');
  var urlToMainModule = './';

  fs.readdirSync(urlToMainModule + 'modules').map(function(file) {
    require(urlToMainModule + 'modules/' + file);
  });

  //# DEVELOP TASKS ################################################################
  var distTasks = ['clean', 'build', 'inject', 'index.min', 'server'];
  var devTasks = ['clean:dev', 'debug:watch', 'build:dev', 'inject:dev', 'server:dev', 'watch:dev'];
  var devConcatTasks = [
    'clean:dev:concat',
    'debug:watch',
    'build:dev:concat',
    'inject:dev:concat',
    'server:dev:concat',
    'watch:dev:concat'
  ];
  gulp.task('dist', gulp.series(distTasks));
  gulp.task('dev', gulp.series(devTasks));
  gulp.task('dev:concat', gulp.series(devConcatTasks));

  //# DEPLOY TASKS #################################################################
  var depliyDistTasks = ['clean', 'build', 'inject', 'index.min'];
  var deployDevTasks = ['clean:dev', 'debug:watch', 'build:dev', 'inject:dev'];
  var deployDevConcatTasks = ['clean:dev:concat', 'debug:watch', 'build:dev:concat', 'inject:dev:concat'];
  gulp.task('deploy:dist', gulp.series(depliyDistTasks));
  gulp.task('deploy:dev', gulp.series(deployDevTasks));
  gulp.task('deploy:dev:concat', gulp.series(deployDevConcatTasks));

  //# DEFAULT TASK #################################################################
  gulp.task('default', gulp.parallel('dev'));
})();

(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');

  //# TASKS COMPILATION ####################
  var distTasks = ['build.app', 'build.styles', 'build.images'];
  var devTasks = ['build.app:dev', 'build.styles:dev', 'build.images:dev'];
  var devConcatTasks = ['build.app:dev:concat', 'build.styles:dev:concat', 'build.images:dev:concat'];

  //## LIFE: Compose all building tasks
  gulp.task('build', gulp.parallel(distTasks));
  //## DEVELOPMENT: Compose all building tasks without concat and obfuscation
  gulp.task('build:dev', gulp.parallel(devTasks));
  //## DEVELOPMENT: Compose all building tasks without obfuscation but concat
  gulp.task('build:dev:concat', gulp.parallel(devConcatTasks));
})();

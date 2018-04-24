(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var esLint = require('gulp-eslint');
  var $ = require('../gulpfile.tree');

  var checkFilesArray = $.source.app.javascript.config.concat([$.source.app.javascript.all]);

  //## DEVELOPMENT: Search for some Code Style and Best Practices errors in JS files and show them:
  gulp.task('debug:compile', function() {
    return gulp.src(checkFilesArray)
      .pipe(esLint())
      .pipe(esLint.format())
      .pipe(esLint.failAfterError());
  });
  gulp.task('debug:watch', function() {
    return gulp.src(checkFilesArray)
      .pipe(esLint())
      .pipe(esLint.format());
  });
})();

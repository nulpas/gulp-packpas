(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var fs = require('fs-extra');
  var htmlMin = require('gulp-htmlmin');
  var $ = require('./gulpfile.tree');

  //# Compose absolute url to module:
  var urlToMainModule = require.resolve('./').split('index.js').join('');

  fs.readdirSync(urlToMainModule + 'modules').map(function(file) {
    require(urlToMainModule + 'modules/' + file);
  });

  //# SUB-TASKS ####################

  //## LIFE: Compose all building tasks
  gulp.task('build', ['build.app', 'build.styles', 'build.images']);
  //## DEVELOPMENT: Compose all building tasks without concat and obfuscation
  gulp.task('build:dev', ['build.app:dev', 'build.styles:dev', 'build.images:dev']);
  //## DEVELOPMENT: Compose all building tasks without obfuscation but concat
  gulp.task('build:dev:concat', ['build.app:dev:concat', 'build.styles:dev:concat', 'build.images:dev:concat']);

  //# MIN INDEX.HTML  ####################

  //## LIFE: Reduce minimum index.html file
  gulp.task('index.min', ['inject'], function() {
    return gulp.src($.paths.dist.index)
      .pipe(htmlMin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }))
      .pipe(gulp.dest($.paths.dist.root));
  });

  //# DEVELOP TASKS ################################################################
  gulp.task('dist', ['clean', 'server']);
  gulp.task('dev', ['clean:dev', 'debug:compile', 'server:dev', 'watch:dev']);
  gulp.task('dev:concat', ['clean:dev:concat', 'debug:compile', 'server:dev:concat', 'watch:dev:concat']);

  //# DEPLOY TASKS #################################################################
  gulp.task('deploy:dist', ['clean', 'index.min']);
  gulp.task('deploy:dev', ['clean:dev', 'debug:watch', 'inject:dev']);
  gulp.task('deploy:dev:concat', ['clean:dev:concat', 'debug:watch', 'inject:dev:concat']);

  //# DEFAULT TASK #################################################################
  gulp.task('default', ['dev']);
})();

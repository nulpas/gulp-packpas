(function() {
  'use strict';

  /*# Load external modules */
  var gulp = require('gulp');
  var imageMin = require('gulp-imagemin');
  var $ = require('../gulpfile.tree');

  /*# OPTIMIZE IMAGES ############## */

  /*## LIFE: Optimize images for production app */
  gulp.task('build.optimize.images', function() {
    return gulp.src($.source.app.images.optimize)
      .pipe(imageMin())
      .pipe(gulp.dest($.paths.dist.imagesApp));
  });
  gulp.task('build.others.images', function() {
    return gulp.src($.source.app.images.rest)
      .pipe(gulp.dest($.paths.dist.imagesApp));
  });
  /*## DEVELOPMENT: Mount images dir for development app */
  gulp.task('build.all.images:dev', function() {
    var allImages = $.source.app.images.optimize.concat($.source.app.images.rest);
    return gulp.src(allImages)
      .pipe(gulp.dest($.paths.dev.imagesApp));
  });
  /*## DEVELOPMENT: Mount images dir for development app without obfuscation but concat */
  gulp.task('build.all.images:dev:concat', function() {
    var allImages = $.source.app.images.optimize.concat($.source.app.images.rest);
    return gulp.src(allImages)
      .pipe(gulp.dest($.paths.devConcat.imagesApp));
  });

  /*# FAVICON FILES ################ */

  /*## LIFE: Get favicon directory */
  gulp.task('build.favicon', function() {
    return gulp.src($.source.app.favicon.all)
      .pipe(gulp.dest($.paths.dist.faviconApp));
  });
  /*## DEVELOPMENT: Get favicon directory */
  gulp.task('build.favicon:dev', function() {
    return gulp.src($.source.app.favicon.all)
      .pipe(gulp.dest($.paths.dev.faviconApp));
  });
  /*## DEVELOPMENT: Get favicon directory for concat method */
  gulp.task('build.favicon:dev:concat', function() {
    return gulp.src($.source.app.favicon.all)
      .pipe(gulp.dest($.paths.devConcat.faviconApp));
  });

  /*# COMPILATION ################## */

  /*## LIFE: Join all building images tasks */
  gulp.task('build.images', ['build.optimize.images', 'build.others.images', 'build.favicon']);
  /*## DEVELOPMENT: Join all building images tasks */
  gulp.task('build.images:dev', ['build.all.images:dev', 'build.favicon:dev']);
  /*## DEVELOPMENT: Join all building images tasks for concat method */
  gulp.task('build.images:dev:concat', ['build.all.images:dev:concat', 'build.favicon:dev:concat']);
})();

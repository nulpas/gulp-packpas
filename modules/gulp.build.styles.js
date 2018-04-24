(function() {
  'use strict';

  /*# Load external modules */
  var gulp = require('gulp');
  var concat = require('gulp-concat');
  var sass = require('gulp-sass');
  var cssnano = require('gulp-cssnano');
  var sourceMaps = require('gulp-sourcemaps');
  var bower = require('main-bower-files');
  var flatten = require('gulp-flatten');
  var rev = require('gulp-rev');
  var $ = require('../gulpfile.tree');

  /*# VENDOR CSS ######################### */

  /*## LIFE: Compile vendor CSS (from bower dependencies) into production app */
  gulp.task('vendor.styles', function() {
    return gulp.src(bower('**/*.css'))
      .pipe(concat($.files.css.vendor))
      .pipe(cssnano())
      .pipe(rev())
      .pipe(gulp.dest($.paths.dist.cssApp));
  });
  //
  /*## DEVELOPMENT: Compile vendor CSS (from bower dependencies) into development app without obfuscation and concat */
  gulp.task('vendor.styles:dev', function() {
    return gulp.src(bower('**/*.css'))
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dev.cssVendor));
  });
  /*## DEVELOPMENT: Compile vendor CSS (from bower dependencies) into development app without obfuscation but concat */
  gulp.task('vendor.styles:dev:concat', function() {
    return gulp.src(bower('**/*.css'))
      .pipe(sourceMaps.init())
      .pipe(concat($.files.css.vendor))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest($.paths.devConcat.cssApp));
  });

  /*# SASS ######################### */

  /*## LIFE: Compile sass files into production app */
  gulp.task('sass', function() {
    return gulp.src($.source.app.sass.all)
      .pipe(sass().on('error', sass.logError))
      .pipe(concat($.files.css.app))
      .pipe(cssnano())
      .pipe(rev())
      .pipe(gulp.dest($.paths.dist.cssApp));
  });
  /*## DEVELOPMENT: Compile sass files into development app without obfuscation and concat */
  gulp.task('sass:dev', function() {
    return gulp.src($.source.app.sass.all)
      .pipe(sass().on('error', sass.logError))
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dev.cssApp));
  });
  /*## DEVELOPMENT: Compile sass files into development app without obfuscation but concat */
  gulp.task('sass:dev:concat', function() {
    return gulp.src($.source.app.sass.all)
      .pipe(sourceMaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(concat($.files.css.app))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest($.paths.devConcat.cssApp));
  });

  /*# FONTS ######################## */

  /*## LIFE: Compile fonts files into dist directory */
  gulp.task('font', function() {
    return gulp.src(bower($.files.font.all))
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dist.cssApp));
  });
  /*## DEVELOPMENT: Compile fonts files into dist-dev directory */
  gulp.task('font:dev', function() {
    return gulp.src($.files.font.all)
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dev.cssVendor));
  });
  /*## DEVELOPMENT: Compile fonts files into dist-dev-concat directory */
  gulp.task('font:dev:concat', function() {
    return gulp.src($.files.font.all)
      .pipe(flatten())
      .pipe(gulp.dest($.paths.devConcat.cssApp));
  });

  /*# COMPILATION ################## */

  /*## LIFE: Join all building styles tasks */
  gulp.task('build.styles', ['vendor.styles', 'sass', 'font']);

  /*## DEVELOPMENT: Join all building styles tasks */
  gulp.task('build.styles:dev', ['vendor.styles:dev', 'sass:dev', 'font:dev']);
  gulp.task('build.styles:dev:concat', ['vendor.styles:dev:concat', 'sass:dev:concat', 'font:dev:concat']);
})();

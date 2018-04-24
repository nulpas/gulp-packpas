(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var watch = require('gulp-watch');
  var $ = require('../gulpfile.tree');

  var checkFilesArray = $.source.app.javascript.config.concat([$.source.app.javascript.all]);
  var checkAllImagesArray = $.source.app.images.optimize.concat($.source.app.images.rest);

  //## DEVELOPMENT: Watching tasks
  gulp.task('watch:dev', function() {
    watch($.source.index, function() {
      gulp.start('clean:dev', 'inject:dev');
    });
    watch(checkFilesArray, function() {
      gulp.start('debug:watch');
    });
    watch($.source.app.html.tpl, function() {
      gulp.start('clean.js.app:dev', 'inject.js.app:dev');
    });
    watch($.source.app.javascript.all, function() {
      gulp.start('clean.js.app:dev', 'inject.js.app:dev');
    });
    watch($.source.app.sass.all, function() {
      gulp.start('clean.css.app:dev', 'inject.css.app:dev');
    });
    watch($.source.bower, function() {
      gulp.start('clean.all.vendor:dev', 'inject.all.vendor:dev');
    });
    watch($.source.app.json.all, function() {
      gulp.start('clean.json.app:dev', 'json:dev');
    });
    watch(checkAllImagesArray, function() {
      gulp.start('clean.images.app:dev', 'build.images:dev');
    });
  });

  //## DEVELOPMENT: Watching tasks without obfuscation but concat
  gulp.task('watch:dev:concat', function() {
    watch($.source.index, function() {
      gulp.start('clean:dev:concat', 'inject:dev:concat');
    });
    watch(checkFilesArray, function() {
      gulp.start('debug:watch');
    });
    watch($.source.app.html.tpl, function() {
      gulp.start('clean.js.app:dev:concat', 'app:dev:concat');
    });
    watch($.source.app.javascript.all, function() {
      gulp.start('clean.js.app:dev:concat', 'app:dev:concat');
    });
    watch($.source.app.sass.all, function() {
      gulp.start('clean.css.app:dev:concat', 'sass:dev:concat');
    });
    watch($.source.bower, function() {
      gulp.start('clean.all.vendor:dev:concat', 'vendor:dev:concat');
    });
    watch($.source.app.json.all, function() {
      gulp.start('clean.json.app:dev:concat', 'json:dev:concat');
    });
    watch(checkAllImagesArray, function() {
      gulp.start('clean.images.app:dev:concat', 'build.images:dev');
    });
  });
})();

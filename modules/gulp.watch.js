(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var $ = require('../gulpfile.tree');

  var checkFilesArray = $.source.app.javascript.config.concat([$.source.app.javascript.all]);
  var checkAllImagesArray = $.source.app.images.optimize.concat($.source.app.images.rest);

  //## DEVELOPMENT: Watching tasks
  gulp.task('watch:dev', function(done) {
    gulp.watch($.source.index, gulp.series('clean:dev', 'inject:dev'));
    gulp.watch(checkFilesArray, gulp.series('debug:watch'));
    gulp.watch($.source.app.html.tpl, gulp.series('clean.js.app:dev', 'inject.js.app:dev'));
    gulp.watch($.source.app.javascript.all, gulp.series('clean.js.app:dev', 'inject.js.app:dev'));
    gulp.watch($.source.app.sass.all, gulp.series('clean.css.app:dev', 'inject.css.app:dev'));
    gulp.watch($.source.bower, gulp.series('clean.all.vendor:dev', 'inject.all.vendor:dev'));
    gulp.watch($.source.app.json.all, gulp.series('clean.json.app:dev', 'json:dev'));
    gulp.watch(checkAllImagesArray, gulp.series('clean.images.app:dev', 'build.images:dev'));
    done();
  });

  //## DEVELOPMENT: Watching tasks without obfuscation but concat
  gulp.task('watch:dev:concat', function(done) {
    gulp.watch($.source.index, gulp.series('clean:dev:concat', 'inject:dev:concat'));
    gulp.watch(checkFilesArray, gulp.series('debug:watch'));
    gulp.watch($.source.app.html.tpl, gulp.series('clean.js.app:dev:concat', 'app:dev:concat'));
    gulp.watch($.source.app.javascript.all, gulp.series('clean.js.app:dev:concat', 'app:dev:concat'));
    gulp.watch($.source.app.sass.all, gulp.series('clean.css.app:dev:concat', 'sass:dev:concat'));
    gulp.watch($.source.bower, gulp.series('clean.all.vendor:dev:concat', 'vendor:dev:concat'));
    gulp.watch($.source.app.json.all, gulp.series('clean.json.app:dev:concat', 'json:dev:concat'));
    gulp.watch(checkAllImagesArray, gulp.series('clean.images.app:dev:concat', 'build.images:dev'));
    done();
  });
})();

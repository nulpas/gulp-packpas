(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var webServer = require('gulp-webserver');
  var $ = require('../gulpfile.tree');

  var lifePort = 9999;
  var devPort = 8989;
  var devConcatPort = 8787;

  //# LIFE: Web Server
  gulp.task('server', ['index.min'], function() {
    gulp.src($.paths.dist.root)
      .pipe(webServer({
        port: lifePort,
        livereload: false,
        directoryListing: {
          enable: false,
          path: $.paths.dist.root
        },
        fallback: $.files.html.index,
        open: $.url.open
      }));
  });

  //# DEVELOPMENT: Web Server
  gulp.task('server:dev', ['inject:dev'], function() {
    gulp.src($.paths.dev.root)
      .pipe(webServer({
        port: devPort,
        livereload: true,
        directoryListing: {
          enable: false,
          path: $.paths.dev.root
        },
        fallback: $.files.html.index,
        open: $.url.open
      }));
  });
  //# DEVELOPMENT: Web Server
  gulp.task('server:dev:concat', ['inject:dev:concat'], function() {
    gulp.src($.paths.devConcat.root)
      .pipe(webServer({
        port: devConcatPort,
        livereload: true,
        directoryListing: {
          enable: false,
          path: $.paths.devConcat.root
        },
        fallback: $.files.html.index,
        open: $.url.open
      }));
  });
})();

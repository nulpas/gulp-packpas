(function() {
  'use strict';

  var gulp = require('gulp');
  var inject = require('gulp-inject');
  var injectString = require('gulp-inject-string');
  var fileSort = require('gulp-angular-filesort');
  var $ = require('../gulpfile.tree');

  var configInjectHeadDist = {
    starttag: '<!-- inject:head:{{ext}} -->',
    ignorePath: $.paths.dist.root.substr(1),
    relative: true
  };
  var configInjectHeadDev = {
    starttag: '<!-- inject:head:{{ext}} -->',
    ignorePath: $.paths.dev.root.substr(1),
    relative: true
  };
  var configInjectHeadDevConcat = {
    starttag: '<!-- inject:head:{{ext}} -->',
    ignorePath: $.paths.devConcat.root.substr(1),
    relative: true
  };
  var configInjectVendorDist = {
    starttag: '<!-- inject:vendor:{{ext}} -->',
    ignorePath: $.paths.dist.root.substr(1),
    relative: true
  };
  var configInjectVendorDev = {
    starttag: '<!-- inject:vendor:{{ext}} -->',
    ignorePath: $.paths.dev.root.substr(1),
    relative: true
  };
  var configInjectVendorDevConcat = {
    starttag: '<!-- inject:vendor:{{ext}} -->',
    ignorePath: $.paths.devConcat.root.substr(1),
    relative: true
  };
  var configInjectAppDist = {
    ignorePath: $.paths.dist.root.substr(1),
    relative: true
  };
  var configInjectAppDev = {
    ignorePath: $.paths.dev.root.substr(1),
    relative: true
  };
  var configInjectAppDevConcat = {
    ignorePath: $.paths.devConcat.root.substr(1),
    relative: true
  };

  //## LIFE: Inject into index.html all compiled JS and CSS files
  gulp.task('inject', ['build'], function() {
    var sourcesHead = gulp.src([$.source.deploy.dist.jsHeadFile]);
    var sourcesVendor = gulp.src([$.source.deploy.dist.jsVendorFile, $.source.deploy.dist.cssVendorFile]);
    var sourcesApp = gulp.src([$.source.deploy.dist.jsAppFile, $.source.deploy.dist.cssAppFile]);
    return gulp.src($.paths.dist.index)
      .pipe(inject(sourcesHead, configInjectHeadDist))
      .pipe(inject(sourcesVendor, configInjectVendorDist))
      .pipe(inject(sourcesApp, configInjectAppDist))
      .pipe(injectString.before($.outer.css.vendor.reference, $.outer.css.vendor.content.join('\n  ') + '\n  '))
      .pipe(gulp.dest($.paths.dist.root));
  });

  //## DEVELOPMENT: Inject into index.html all compiled JS and CSS files
  gulp.task('inject:dev', ['build:dev'], function() {
    var sourceHeadJS = gulp.src($.source.deploy.dev.jsHead);
    var sourcesVendorJS = gulp.src($.source.deploy.dev.jsVendor);
    var sourcesVendorCSS = gulp.src($.source.deploy.dev.cssVendor);
    var sourcesJS = gulp.src($.source.deploy.dev.jsApp);
    var sourcesCSS = gulp.src($.source.deploy.dev.cssApp);
    return gulp.src($.paths.dev.index)
      .pipe(inject(sourceHeadJS.pipe(fileSort()), configInjectHeadDev))
      .pipe(inject(sourcesVendorJS.pipe(fileSort()), configInjectVendorDev))
      .pipe(inject(sourcesJS.pipe(fileSort()), configInjectAppDev))
      .pipe(inject(sourcesVendorCSS, configInjectVendorDev))
      .pipe(inject(sourcesCSS, configInjectAppDev))
      .pipe(injectString.before($.outer.css.vendor.reference, $.outer.css.vendor.content.join('\n  ') + '\n  '))
      .pipe(gulp.dest($.paths.dev.root));
  });
  //## DEVELOPMENT: Inject into index.html all compiled JS and CSS files in concat style
  gulp.task('inject:dev:concat', ['build:dev:concat'], function() {
    var sourcesHead = gulp.src([$.source.deploy.devConcat.jsHeadFile]);
    var sourcesVendor = gulp.src([$.source.deploy.devConcat.jsVendorFile, $.source.deploy.devConcat.cssVendorFile]);
    var sourcesApp = gulp.src([$.source.deploy.devConcat.jsAppFile, $.source.deploy.devConcat.cssAppFile]);
    return gulp.src($.paths.devConcat.index)
      .pipe(inject(sourcesHead, configInjectHeadDevConcat))
      .pipe(inject(sourcesVendor, configInjectVendorDevConcat))
      .pipe(inject(sourcesApp, configInjectAppDevConcat))
      .pipe(injectString.before($.outer.css.vendor.reference, $.outer.css.vendor.content.join('\n  ') + '\n  '))
      .pipe(gulp.dest($.paths.devConcat.root));
  });

  //## DEVELOPMENT: Inject into index.html partial compiled files for watch tasks
  gulp.task('inject.js.app:dev', ['app:dev'], function() {
    var sourcesJS = gulp.src($.source.deploy.dev.jsApp);
    return gulp.src($.paths.dev.index)
      .pipe(inject(sourcesJS.pipe(fileSort()), configInjectAppDev))
      .pipe(gulp.dest($.paths.dev.root));
  });
  gulp.task('inject.css.app:dev', ['sass:dev'], function() {
    var sourcesCSS = gulp.src($.source.deploy.dev.cssApp);
    return gulp.src($.paths.dev.index)
      .pipe(inject(sourcesCSS, configInjectAppDev))
      .pipe(gulp.dest($.paths.dev.root));
  });
  gulp.task('inject.all.vendor:dev', ['vendor:dev', 'vendor.styles:dev'], function() {
    var sourcesHeadJS = gulp.src($.source.deploy.dev.jsHead);
    var sourcesVendorJS = gulp.src($.source.deploy.dev.jsVendor);
    var sourcesVendorCSS = gulp.src($.source.deploy.dev.cssVendor);
    return gulp.src($.paths.dev.index)
      .pipe(inject(sourcesHeadJS.pipe(fileSort()), configInjectHeadDev))
      .pipe(inject(sourcesVendorJS.pipe(fileSort()), configInjectVendorDev))
      .pipe(inject(sourcesVendorCSS, configInjectVendorDev))
      .pipe(injectString.before($.outer.css.vendor.reference, $.outer.css.vendor.content.join('\n  ') + '\n  '))
      .pipe(gulp.dest($.paths.dev.root));
  });
})();

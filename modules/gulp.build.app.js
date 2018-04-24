(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var es = require('event-stream');
  var templateCache = require('gulp-angular-templatecache');
  var htmlMin = require('gulp-htmlmin');
  var concat = require('gulp-concat');
  var sourceMaps = require('gulp-sourcemaps');
  var bower = require('main-bower-files');
  var rev = require('gulp-rev');
  var flatten = require('gulp-flatten');
  var uglify = require('gulp-uglify');
  var $ = require('../gulpfile.tree');

  //# TPL ANGULAR CACHE ####################

  //## LIFE: Add all tpl files to Angular template cache
  var getTplCache = function() {
    return gulp.src($.source.app.html.tpl)
      .pipe(htmlMin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }))
      .pipe(templateCache({
        root: 'bundles',
        module: 'app.templateCache',
        standalone: true
      }));
  };
  //## DEVELOPMENT: Add all tpl files to Angular template cache
  var getTplCacheDev = function() {
    return gulp.src($.source.app.html.tpl)
      .pipe(templateCache($.files.javascript.templates, {
        root: 'bundles',
        module: 'app.templateCache',
        standalone: true
      }));
  };

  //# VENDOR JS ####################

  //## LIFE: Compile vendor JS into production app
  gulp.task('vendor', function() {
    gulp.src(bower($.files.javascript.jsHeadFilter))
      .pipe(concat($.files.javascript.head))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest($.paths.dist.jsApp));
    return gulp.src(bower($.files.javascript.jsVendorFilter))
      .pipe(concat($.files.javascript.vendor))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest($.paths.dist.jsApp));
  });
  //## DEVELOPMENT: Compile vendor JS into development app without obfuscation and concat
  gulp.task('vendor:dev', function() {
    gulp.src(bower($.files.javascript.jsHeadFilter))
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dev.jsHead));
    return gulp.src(bower($.files.javascript.jsVendorFilter))
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dev.jsVendor));
  });
  //## DEVELOPMENT: Compile vendor JS into development app without obfuscation but concat
  gulp.task('vendor:dev:concat', function() {
    gulp.src(bower($.files.javascript.jsHeadFilter))
      .pipe(sourceMaps.init())
      .pipe(concat($.files.javascript.head))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest($.paths.devConcat.jsApp));
    return gulp.src(bower($.files.javascript.jsVendorFilter))
      .pipe(sourceMaps.init())
      .pipe(concat($.files.javascript.vendor))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest($.paths.devConcat.jsApp));
  });

  //# APP JS ####################

  //## LIFE: Compile app JS into production app
  gulp.task('app', function() {
    return es.merge(gulp.src($.source.app.javascript.load), getTplCache())
      .pipe(concat($.files.javascript.app))
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest($.paths.dist.jsApp));
  });
  //## DEVELOPMENT: Compile app JS into development app without obfuscation and concat
  gulp.task('app:dev', function() {
    return es.merge(gulp.src($.source.app.javascript.load), getTplCacheDev())
      .pipe(flatten())
      .pipe(gulp.dest($.paths.dev.jsApp));
  });
  //## DEVELOPMENT: Compile app JS into development app without obfuscation but concat
  gulp.task('app:dev:concat', function() {
    return es.merge(gulp.src($.source.app.javascript.load), getTplCacheDev())
      .pipe(sourceMaps.init())
      .pipe(concat($.files.javascript.app))
      .pipe(sourceMaps.write('.'))
      .pipe(gulp.dest($.paths.devConcat.jsApp));
  });

  //# APP JSON ######################

  //## LIFE: Compile JSON files into dist directory
  gulp.task('json', function() {
    return gulp.src($.source.app.json.all)
      .pipe(gulp.dest($.paths.dist.jsonApp));
  });
  //## DEVELOPMENT: Compile JSON files into dist-dev directory
  gulp.task('json:dev', function() {
    return gulp.src($.source.app.json.all)
      .pipe(gulp.dest($.paths.dev.jsonApp));
  });
  //## DEVELOPMENT: Compile JSON files into dist-dev-concat directory
  gulp.task('json:dev:concat', function() {
    return gulp.src($.source.app.json.all)
      .pipe(gulp.dest($.paths.devConcat.jsonApp));
  });

  //# INDEX HTML ####################

  //## LIFE: Replace main file index.html
  gulp.task('index', function() {
    return gulp.src($.source.index)
      .pipe(gulp.dest($.paths.dist.root));
  });
  //## DEVELOPMENT: Replace main file index.html
  gulp.task('index:dev', function() {
    return gulp.src($.source.index)
      .pipe(gulp.dest($.paths.dev.root));
  });
  //## DEVELOPMENT: Replace main file index.html for concat method.
  gulp.task('index:dev:concat', function() {
    return gulp.src($.source.index)
      .pipe(gulp.dest($.paths.devConcat.root));
  });

  //# COMPILATION ####################

  //## LIFE: Join all building tasks
  gulp.task('build.app', ['vendor', 'app', 'json', 'index']);

  //## DEVELOPMENT: Join all building tasks
  gulp.task('build.app:dev', ['vendor:dev', 'app:dev', 'json:dev', 'index:dev']);
  gulp.task('build.app:dev:concat', ['vendor:dev:concat', 'app:dev:concat', 'json:dev:concat', 'index:dev:concat']);
})();

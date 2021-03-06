(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');

  /**
   * @name fs
   * @type {Object}
   */
  var fs = require('fs-extra');
  var log = require('fancy-log');
  var $ = require('../gulpfile.tree');

  //## LIFE: Removes production directory
  gulp.task('clean', function(done) {
    try {
      fs.removeSync($.paths.dist.root);
      log.info('Production directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  //## DEVELOPMENT: Removes development directory
  gulp.task('clean:dev', function(done) {
    try {
      fs.removeSync($.paths.dev.root);
      log.info('Development directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  //## DEVELOPMENT: Removes development concat directory
  gulp.task('clean:dev:concat', function(done) {
    try {
      fs.removeSync($.paths.devConcat.root);
      log.info('Development concat directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });

  //## DEVELOPMENT: Remove development directories for watch tasks
  gulp.task('clean.js.app:dev', function(done) {
    try {
      fs.removeSync($.source.deploy.dev.jsApp);
      log.info('Development App JS directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.css.app:dev', function(done) {
    try {
      fs.removeSync($.source.deploy.dev.cssApp);
      log.info('Development App CSS directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.all.vendor:dev', function(done) {
    try {
      fs.removeSync($.source.deploy.dev.jsVendor);
      fs.removeSync($.source.deploy.dev.cssVendor);
      log.info('Development Vendor JS and CSS directories cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.json.app:dev', function(done) {
    try {
      fs.removeSync($.paths.dev.jsonApp);
      log.info('Development JSON directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.images.app:dev', function(done) {
    try {
      fs.removeSync($.paths.dev.imagesApp);
      log.info('Development IMAGES directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });

  //## DEVELOPMENT: Remove development directories for watch tasks without obfuscation but concat
  gulp.task('clean.js.app:dev:concat', function(done) {
    try {
      fs.removeSync($.source.deploy.devConcat.jsAppFile + '*');
      log.info('Development App JS files cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.css.app:dev:concat', function(done) {
    try {
      fs.removeSync($.source.deploy.devConcat.cssAppFile + '*');
      log.info('Development App CSS files cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.all.vendor:dev:concat', function(done) {
    try {
      fs.removeSync($.source.deploy.devConcat.jsVendorFile + '*');
      fs.removeSync($.source.deploy.devConcat.cssVendorFile + '*');
      log.info('Development Vendor JS and CSS files cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.json.app:dev:concat', function(done) {
    try {
      fs.removeSync($.paths.devConcat.jsonApp);
      log.info('Development JSON directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
  gulp.task('clean.images.app:dev:concat', function(done) {
    try {
      fs.removeSync($.paths.devConcat.imagesApp);
      log.info('Development IMAGES directory cleaned...');
      done();
    } catch (error) {
      log.error(error);
    }
  });
})();

(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');

  /**
   * @name fs
   * @type {Object}
   */
  var fs = require('fs-extra');

  //# Compose absolute url to module:
  var urlToMainModule = require.resolve('./').split('index.js').join('');

  fs.readdirSync(urlToMainModule + 'modules').map(function(file) {
    require(urlToMainModule + 'modules/' + file);
  });

  gulp.task('debug', gulp.parallel('debug:compile'));

  gulp.task('default', gulp.parallel('debug'));
})();

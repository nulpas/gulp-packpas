(function() {
  'use strict';

  //# Load external modules
  var gulp = require('gulp');
  var fs = require('fs-extra');

  //# Compose absolute url to module:
  var urlToMainModule = require.resolve('./').split('index.js').join('');

  fs.readdirSync(urlToMainModule + 'modules').map(function(file) {
    require(urlToMainModule + 'modules/' + file);
  });

  gulp.task('debug', ['debug:compile']);

  gulp.task('default', ['debug']);
})();

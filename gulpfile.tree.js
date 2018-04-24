(function() {
  'use strict';

  /*# Directories */
  var sourceAppDir = 'app';
  var sourceBundlesDir = sourceAppDir + '/bundles';
  var sourceImagesDir = sourceAppDir + '/images';
  var sourceJsonDir = sourceAppDir + '/json';
  var sourceFaviconDir = sourceAppDir + '/favicon';

  var dist = 'dist';
  var distDev = 'dist-dev';
  var distDevConcat = 'dist-dev-concat';
  var jsDeploy = 'js';
  var cssDeploy = 'css';
  var imagesDeploy = 'images';
  var jsonDeploy = 'json';
  var deployHead = 'head';
  var deployVendor = 'vendor';
  var faviconDeploy = 'favicon';

  var gulpDir = 'modules';

  /*# File Names */
  var mainHtmlFile = 'index.html';
  var jsAppFile = 'app.js';
  var jsHeadFile = 'head.js';
  var jsVendorFile = 'vendor.js';
  var cssAppFile = 'app.css';
  var cssVendorFile = 'vendor.css';
  var templateCacheFile = 'app.templates.module.js';

  /*# Url's */
  var openPageRoute = 'login';

  module.exports = {
    files: {
      html: {
        index: mainHtmlFile
      },
      javascript: {
        head: jsHeadFile,
        vendor: jsVendorFile,
        app: jsAppFile,
        templates: templateCacheFile,
        jsHeadFilter: [
          '**/jquery.js',
          '**/angular.js',
          '**/Chart.js',
          '**/lodash.js'
        ],
        jsVendorFilter: '**/!(jquery|angular|Chart|lodash).js'
      },
      font: {
        all: [
          '**/MaterialIcons-Regular.eot',
          '**/MaterialIcons-Regular.ttf',
          '**/MaterialIcons-Regular.woff',
          '**/MaterialIcons-Regular.woff2'
        ]
      },
      css: {
        vendor: cssVendorFile,
        app: cssAppFile
      }
    },
    url: {
      open: openPageRoute
    },
    paths: {
      dev: {
        root: './' + distDev,
        index: './' + distDev + '/' + mainHtmlFile,
        jsHead: './' + distDev + '/' + jsDeploy + '/' + deployHead,
        jsVendor: './' + distDev + '/' + jsDeploy + '/' + deployVendor,
        jsApp: './' + distDev + '/' + jsDeploy,
        cssVendor: './' + distDev + '/' + cssDeploy + '/' + deployVendor,
        cssApp: './' + distDev + '/' + cssDeploy,
        imagesApp: './' + distDev + '/' + imagesDeploy,
        jsonApp: './' + distDev + '/' + jsonDeploy,
        faviconApp: './' + distDev + '/' + faviconDeploy
      },
      devConcat: {
        root: './' + distDevConcat,
        index: './' + distDevConcat + '/' + mainHtmlFile,
        jsApp: './' + distDevConcat + '/' + jsDeploy,
        cssApp: './' + distDevConcat + '/' + cssDeploy,
        imagesApp: './' + distDevConcat + '/' + imagesDeploy,
        jsonApp: './' + distDevConcat + '/' + jsonDeploy,
        faviconApp: './' + distDevConcat + '/' + faviconDeploy
      },
      dist: {
        root: './' + dist,
        index: './' + dist + '/' + mainHtmlFile,
        jsVendor: './' + dist + '/' + jsDeploy + '/' + deployVendor,
        jsApp: './' + dist + '/' + jsDeploy,
        cssVendor: './' + dist + '/' + cssDeploy + '/' + deployVendor,
        cssApp: './' + dist + '/' + cssDeploy,
        imagesApp: './' + dist + '/' + imagesDeploy,
        jsonApp: './' + dist + '/' + jsonDeploy,
        faviconApp: './' + dist + '/' + faviconDeploy
      }
    },
    source: {
      index: './' + sourceAppDir + '/' + mainHtmlFile,
      bower: './bower.json',
      app: {
        html: {
          all: './' + sourceAppDir + '/**/*.html',
          tpl: './' + sourceBundlesDir + '/**/*.tpl.html'
        },
        javascript: {
          all: './' + sourceAppDir + '/**/*.js',
          load: [
            './' + sourceAppDir + '/app.module.js',
            './' + sourceAppDir + '/app.config.js',
            './' + sourceAppDir + '/app.router.js',
            './' + sourceAppDir + '/app.run.js',

            './' + sourceAppDir + '/**/*.module.js',

            './' + sourceAppDir + '/**/!(*.module).js'
          ],
          config: [
            './gulpfile.js',
            './' + gulpDir + '/**/*.js'
          ]
        },
        sass: {
          all: './' + sourceAppDir + '/**/*.scss'
        },
        images: {
          optimize: [
            './' + sourceImagesDir + '/**/*.jpg',
            './' + sourceImagesDir + '/**/*.jpeg',
            './' + sourceImagesDir + '/**/*.png',
            './' + sourceImagesDir + '/**/*.gif',
            './' + sourceImagesDir + '/**/*.svg'
          ],
          rest: [
            './' + sourceImagesDir + '/**/*.ico'
          ]
        },
        json: {
          all: './' + sourceJsonDir + '/**/*.*'
        },
        favicon: {
          all: './' + sourceFaviconDir + '/**/*'
        }
      },
      deploy: {
        dev: {
          index: './' + distDev + '/' + mainHtmlFile,
          jsApp: './' + distDev + '/' + jsDeploy + '/*.js',
          jsHead: './' + distDev + '/' + jsDeploy + '/' + deployHead + '/*.js',
          jsVendor: './' + distDev + '/' + jsDeploy + '/' + deployVendor + '/*.js',
          jsAppFile: './' + distDev + '/' + jsDeploy + '/' + jsAppFile,
          jsHeadFile: './' + distDev + '/' + jsDeploy + '/' + jsHeadFile,
          jsVendorFile: './' + distDev + '/' + jsDeploy + '/' + jsVendorFile,
          cssApp: './' + distDev + '/' + cssDeploy + '/*.css',
          cssVendor: './' + distDev + '/' + cssDeploy + '/' + deployVendor + '/*.css',
          cssAppFile: './' + distDev + '/' + cssDeploy + '/' + cssAppFile,
          cssVendorFile: './' + distDev + '/' + cssDeploy + '/' + cssVendorFile
        },
        devConcat: {
          jsAppFile: './' + distDevConcat + '/' + jsDeploy + '/' + jsAppFile,
          jsHeadFile: './' + distDevConcat + '/' + jsDeploy + '/' + jsHeadFile,
          jsVendorFile: './' + distDevConcat + '/' + jsDeploy + '/' + jsVendorFile,
          cssAppFile: './' + distDevConcat + '/' + cssDeploy + '/' + cssAppFile,
          cssVendorFile: './' + distDevConcat + '/' + cssDeploy + '/' + cssVendorFile
        },
        dist: {
          index: './' + dist + '/' + mainHtmlFile,
          jsAppFile: './' + dist + '/' + jsDeploy + '/app-*.js',
          jsHeadFile: './' + dist + '/' + jsDeploy + '/head-*.js',
          jsVendorFile: './' + dist + '/' + jsDeploy + '/vendor-*.js',
          cssAppFile: './' + dist + '/' + cssDeploy + '/app-*.css',
          cssVendorFile: './' + dist + '/' + cssDeploy + '/vendor-*.css'
        }
      }
    },
    outer: {
      css: {
        vendor: {
          reference: '<!-- inject:css -->',
          content: [
            '<!-- injectString:vendor:external:css -->',
            '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">',
            '<!-- endInjectString -->'
          ]
        }
      }
    }
  };
})();

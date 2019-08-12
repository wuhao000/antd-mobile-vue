'use strict';
// const install = require('./install')
const getBabelCommonConfig = require('../getBabelCommonConfig');
const merge2 = require('merge2');
const through2 = require('through2');
const transformLess = require('../transformLess');
const babel = require('gulp-babel');

const path = require('path');
// const watch = require('gulp-watch')
const gulp = require('gulp');
const rimraf = require('rimraf');
const replaceLib = require('../replaceLib');
const stripCode = require('gulp-strip-code');

const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  babelConfig.babelrc = false;
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  } else {
    babelConfig.plugins.push(require.resolve('babel-plugin-add-module-exports'));
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/\/style\/index\.(js|jsx)$/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(
              content.replace(/\/style\/?'/g, '/style/css\'').replace(/\.less/g, '.css')
          );
          file.path = file.path.replace(/index\.(js|jsx)$/, 'css.js');
          this.push(file);
          next();
        } else {
          next();
        }
      })
  );
  if (modules === false) {
    stream = stream.pipe(
        stripCode({
          start_comment: '@remove-on-es-build-begin',
          end_comment: '@remove-on-es-build-end'
        })
    );
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compile(modules) {
  rimraf.sync(modules !== false ? libDir : esDir);
  const less = gulp
      .src(['src/**/*.less'])
      .pipe(
          through2.obj(function(file, encoding, next) {
            this.push(file.clone());
            if (
                file.path.match(/\/style\/index\.less$/) ||
                file.path.match(/\/style\/v2-compatible-reset\.less$/)
            ) {
              transformLess(file.path)
                  .then(css => {
                    file.contents = Buffer.from(css);
                    file.path = file.path.replace(/\.less$/, '.css');
                    this.push(file);
                    next();
                  })
                  .catch(e => {
                    console.error(e);
                  });
            } else {
              next();
            }
          })
      )
      .pipe(gulp.dest(modules === false ? esDir : libDir));
  const assets = gulp
      .src(['src/**/*.@(png|svg)'])
      .pipe(gulp.dest(modules === false ? esDir : libDir));

  const source = ['src/**/*.ts', 'src/**/*.tsx', '!components/*/__tests__/*'];
  const jsFilesStream = babelify(gulp.src(source), modules);
  return merge2([less, jsFilesStream, assets]);
}

compile(false);

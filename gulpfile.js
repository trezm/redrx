'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var tsProject = plugins.typescript.createProject('tsconfig.json', {
  typescript: require('typescript')
});

const OUTPUT_DIR = 'core/';

gulp.task('build:dev:ts', function() {
    return gulp.src(['src/**/*.ts', 'typings/**/*.ts'])
      .pipe(plugins.plumber())
      .pipe(plugins.typescript(tsProject))
      .js.pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('run:test', ['build:dev:ts'], function() {
  return gulp.src('./dist/**/*.spec.js', {
      read: false
    })
    .pipe(plugins.mocha())
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});

gulp.task('build', ['build:dev:ts']);
gulp.task('test', ['run:test']);
gulp.task('default', ['test']);

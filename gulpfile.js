'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const tsProject = plugins.typescript.createProject('tsconfig.json', {
  typescript: require('typescript')
});
const merge = require('merge2');

const OUTPUT_DIR = 'core/';

gulp.task('build:dev:ts', function() {
  const results = gulp.src(['./src/**/*.ts'])
    .pipe(plugins.plumber())
    .pipe(plugins.typescript(tsProject))

  return merge([
    results.dts.pipe(gulp.dest(OUTPUT_DIR)),
    results.js.pipe(gulp.dest(OUTPUT_DIR))
  ]);
});

gulp.task('run:test', ['build:dev:ts'], function() {
  return gulp.src(OUTPUT_DIR + '**/*.spec.js', {
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

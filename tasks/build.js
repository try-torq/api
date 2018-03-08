import gulp from 'gulp';
import path from 'path';
import runSequence from 'run-sequence';

import paths from './paths.json';

const $ = require('gulp-load-plugins')({ lazy: true })

let projSrc, testSrc;

gulp.task('build', cb => runSequence(
  'lint',
  'clean',
  [
    'build:transpile:src',
    'build:transpile:test',
  ],
  cb
));

gulp.task('build:transpile:src', () => transpile(paths.src));
gulp.task('build:transpile:test', () => transpile(paths.test));

function transpile(filePath, isTest, files) {
  files = files || '/**/*.ts';

  if (!projSrc && !isTest)
    projSrc = $.typescript.createProject('tsconfig.json', {
      typescript: require('typescript')
    })
  
  if (!testSrc && isTest)
    testSrc = $.typescript.createProject('tsconfig.json', {
      typescript: require('typescript')
    })

  let out = !!isTest ? testSrc : projSrc;
  return gulp
    .src([
      './typings/index.d.ts',
      './typings_custom/**/*.d.ts',
      path.join(filePath, files)
    ])
    .pipe($.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe(tsProject())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(filePath));
}

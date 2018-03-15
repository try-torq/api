import gulp from 'gulp'
import path from 'path'
import tsc from 'gulp-typescript'
import sourcemaps from 'gulp-sourcemaps'

import paths from './paths.json'

gulp.task('build', () => {
  const sourceFiles = paths.src + '/**/*.ts'
  const typeDefFiles = paths.types + '/**/*.ts'
  const project = tsc.createProject(paths.tsconfig)
  const res = gulp.src([sourceFiles, typeDefFiles])
    .pipe(sourcemaps.init())
    .pipe(project())
  
  res.dts.pipe(gulp.dest('../' + paths.dist))
  return res
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist))
})

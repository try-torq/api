import gulp from 'gulp'
import tslint from 'gulp-tslint'

import paths from './paths.json'

gulp.task('lint', () => {
  gulp.src([
    paths.types,
    paths.src,
  ])
    .pipe(tslint({ formatter: 'verbose' }))
    .pipe(tslint.report())
})

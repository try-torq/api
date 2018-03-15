import gulp from 'gulp'
import del from 'del'

gulp.task('clean', () => {
  return del([
    'dist/**/*.ts',
    'yarn-error.log',
    'yarn-debug.log',
  ])
})

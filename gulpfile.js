'use strict';

const gulp = require('gulp');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('build', function() {
  return gulp.src('frontend/**/*.*')
    .pipe(gulp.dest('public'));
});
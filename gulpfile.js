'use strict';

const gulp = require('gulp');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var rename = require("gulp-rename");

gulp.task('css', function() {
  return gulp.src('frontend/**/*.css')
    .pipe(rename({
      dirname: "css"
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
  return gulp.src('frontend/**/*.js')
    .pipe(rename({
      dirname: "js"
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('css', 'js'));
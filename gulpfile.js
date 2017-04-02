'use strict';

const gulp = require('gulp');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var rename = require("gulp-rename");
const del = require('del');

gulp.task('clean', function() {
  return del([
    'views',
    'public/css', 
    'public/js',
    'public/fonts',
    'public/*.{jpg,png,svg}'
  ]);
});

gulp.task('templates', function() {
  return gulp.src('frontend/**/*.jade')
    .pipe(rename({
      dirname: "views"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('fonts', function() {
  return gulp.src('frontend/**/*.{woff,woff2}')
    .pipe(rename({
      dirname: "fonts"
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('images', function() {
  return gulp.src('frontend/**/*.{jpg,png,svg}')
    .pipe(rename({
      dirname: "/"
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('css', function() {
  return gulp.src('frontend/**/*.css')
    .pipe(rename({
      dirname: "css"
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('js', function() {
  return gulp.src('frontend/build/*.js')
    .pipe(rename({
      dirname: "js"
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('clean', 'templates', 'fonts', 'images', 'css', 'js'));

gulp.task('dev', 
  gulp.series(
    'build',
    gulp.parallel(function(){
      gulp.watch('frontend/**/*.jade', gulp.series('templates'));
      gulp.watch('frontend/**/*.{woff,woff2}', gulp.series('fonts'));
      gulp.watch('frontend/**/*.{jpg,png,svg}', gulp.series('images'));
      gulp.watch('frontend/**/*.css', gulp.series('css'));
      gulp.watch('frontend/**/*.js', gulp.series('js'));
    })
  )
);
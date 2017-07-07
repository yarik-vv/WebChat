'use strict';

const gulp = require('gulp');

const webpack  = require('webpack');
const webpackConfig = require('./frontend/webpack.config.js');
let statsLog = {
  colors: true,
  reasons: true
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const sourcemaps = require('gulp-sourcemaps');
const notifier = require('node-notifier');
const gutil    = require('gulp-util');
const rename = require('gulp-rename');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('clean', () => {
  return del([
    'views',
    'public/css', 
    'public/js',
    'public/fonts',
    'public/*.{jpg,png,svg}'
  ]);
});

gulp.task('templates', () => {
  return gulp.src('frontend/**/*.jade')
    .pipe(rename({
      dirname: "views"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('fonts', () => {
  return gulp.src('frontend/**/*.{woff,woff2}')
    .pipe(rename({
      dirname: "fonts"
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('images', () => {
  return gulp.src('frontend/**/*.{jpg,png,svg}')
    .pipe(rename({
      dirname: "/"
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('saas', () => {
  return gulp.src('frontend/**/*.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))	
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(rename({
      dirname: "css"
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('webpack', (done) => {
  webpack(webpackConfig, onComplete);
  function onComplete(error, stats) {
    if (error) {
      onError(error);
    } 
    else if ( stats.hasErrors() ) { 
      onError( stats.toString(statsLog) );
    } 
    else {
      onSuccess( stats.toString(statsLog) );
    }
  }
  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }
  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
});

gulp.task('js', () => {
  return gulp.src('frontend/build/*.js')
    .pipe(rename({
      dirname: "js"
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('clean', 'templates', 'fonts', 'images', 'saas', 'webpack', 'js'));

gulp.task('dev', 
  gulp.series(
    'build',
    gulp.parallel( () => {
      gulp.watch('frontend/**/*.jade', gulp.series('templates'));
      gulp.watch('frontend/**/*.{woff,woff2}', gulp.series('fonts'));
      gulp.watch('frontend/**/*.{jpg,png,svg}', gulp.series('images'));
      gulp.watch('frontend/**/*.scss', gulp.series('saas'));
      gulp.watch('frontend/**/*.js', gulp.series('js'));
    })
  )
);
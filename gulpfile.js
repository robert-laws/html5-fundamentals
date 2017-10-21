var gulp = require('gulp')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var gutil = require('gulp-util')
var path = require('path')
var data = require('gulp-data')

var browserSync = require('browser-sync').create()

// browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('html', function() {
  gulp.src('./src/pug/index.pug')
    .pipe(data(function(file) {
      return require('./src/data/nav.json')
    }))
    .pipe(data(function(file) {
      return require('./src/data/data.json')
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('css', function() {
  gulp.src(['./src/css/*.css', './src/sass/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('images', function() {
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('js', function() {
  gulp.src('./src/js/**')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch', ['browserSync', 'build'], function() {
  gulp.watch('./src/**/*.pug', ['html'])
  gulp.watch('./src/sass/*.scss', ['css'])
  gulp.watch('./src/js/**', ['js'])
  gulp.watch('./src/img/*', ['images'])
})

gulp.task('build', ['html', 'css', 'images', 'js'])

gulp.task('default', ['watch'])
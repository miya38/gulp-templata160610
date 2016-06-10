var gulp = require('gulp'),
  browser = require('browser-sync'),
  sass = require('gulp-sass'),
  pleeease = require('gulp-pleeease'),
  htmlhint = require('gulp-htmlhint'),
  plumber = require('gulp-plumber'),
  reload = browser.reload,
  runSequence = require('run-sequence');

//default task ->
gulp.task('sass', function() {
  gulp.src('./src/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'})) //nested, compact, compressed, expanded.
    .pipe(pleeease({
      autoprefixer: {'browsers': ['last 4 versions','ie 8', 'Android 2.3']},
      minifier: false
    }))
    .pipe(gulp.dest('./src/'))
    .pipe(browser.reload({stream:true}));
});
gulp.task('htmllint', function () {
  return gulp.src(['./src/**/*.html'])
    .pipe(plumber())
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
});
gulp.task('reload',function() {
  gulp.src().pipe(browser.reload({stream:true}));
});
gulp.task('watch',['server'], function() {
  gulp.watch('./src/**/*.scss',['sass']);
  gulp.watch('./src/**/*.html',['htmllint']);
});
gulp.task('server', function() {
  browser({
    server: {
      baseDir: './src/'
    }
  });
  gulp.watch('./src/**/*.html', reload);
});
gulp.task('default', function(callback) {
  return runSequence('sass','htmllint','watch',callback);
});

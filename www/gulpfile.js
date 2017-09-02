var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

// Build CSS
gulp.task('css', function() {
   gulp.src('resources/css/*.css')
   .pipe(concat('style.css'))
   .pipe(minify())
   .pipe(gulp.dest('public/assets/css/'));
});

// Build JS
gulp.task('js', function(){
   gulp.src('resources/js/*.js')
   .pipe(concat('app.js'))
   .pipe(uglify())
   .pipe(gulp.dest('public/assets/js/'));
});

// Default task
gulp.task('default',['js','css'], function() {});
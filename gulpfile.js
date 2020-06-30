var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

// Build CSS
gulp.task('css', function() {
   gulp.src([ 'resources/css/style.css', 'resources/css/app.css' ] )
   .pipe(concat('style.css'))
   .pipe(minify())
   .pipe(gulp.dest('assets/css/'));
});

// Build JS
gulp.task('js', function() {
   gulp.src('resources/js/functions.js')
   .pipe(uglify())
   .pipe(concat('app.js'))
   .pipe(gulp.dest('assets/js/'));
});

// Build Vue App
gulp.task('vue', function() {
   gulp.src('resources/js/vueApp.js')
   .pipe(concat('vueApp.js'))
   .pipe(gulp.dest('assets/js/'));
});

// Build images
gulp.task('images', function() {

	gulp.src('resources/css/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('static/css/images/'));

	gulp.src('resources/css/images/sprite/*')
		.pipe(imagemin())
		.pipe(gulp.dest('static/css/images/sprite/'));

	gulp.src('resources/css/images/temp/*')
		.pipe(imagemin())
		.pipe(gulp.dest('static/css/images/temp/'));

  gulp.src('resources/css/images/people/*')
    .pipe(imagemin())
    .pipe(gulp.dest('static/css/images/people/'));

  gulp.src('resources/css/images/logos/*')
    .pipe(imagemin())
    .pipe(gulp.dest('static/css/images/logos/'));
});

// Watch
gulp.task('watch', function () {
  gulp.watch('resources/js/*.js', ['js']);
  gulp.watch('resources/css/*.css', ['css']);
});

// Default task
gulp.task('default',['js', 'vue', 'css', 'images'], function() {});

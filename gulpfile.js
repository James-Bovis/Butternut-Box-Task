var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var del = require('del');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');

// Runs browsersync on src folder
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
})

// Compiles the SCSS into CSS
gulp.task('sass', function(){
  return gulp.src('sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Watches CSS, JS and HTML files for changes and reloads browser
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('sass/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('js/**/*.js', browserSync.reload); 
});

// Compress images
gulp.task('images', function(){
  return gulp.src('img/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin())) // Use cache to save on time
  .pipe(gulp.dest('img/'))
});

// Main Gulp Task
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})



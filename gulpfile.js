var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var del = require('del');

// TASKS FOR RUNNING LOCAL BUILD

  // Runs browsersync on src folder
  gulp.task('browserSync', function() {
    browserSync.init({
      server: {
        baseDir: './',
      },
    })
  })

  // Compiles the SCSS sheets code into CSS in SRC
  gulp.task('sass', function(){
    return gulp.src('sass/style.scss')
      .pipe(sass())
      .pipe(gulp.dest('css/'))
      .pipe(browserSync.reload({
        stream: true
      }))
  });

  // Watches CSS and JS files for changes and reloads browser
  gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('sass/**/*.scss', ['sass']); 
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload); 
    gulp.watch('js/**/*.js', browserSync.reload); 
  });

  // Main Gulp Task
  gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
      callback
    )
  })



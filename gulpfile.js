// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');

// Compile Our stylus
gulp.task('stylus', function() {
    return gulp.src('src/stylus/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false
        }))
        .pipe(concatCss('css/bundle.css'))
        //.pipe(rename('styles.dev.css'))    these two lines export non minified
        //.pipe(gulp.dest(''))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('css/styles.min.css'))
        .pipe(gulp.dest('dist'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        //.pipe(concat('scripts.dev.js'))
        //.pipe(gulp.dest(''))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/stylus/*.styl', ['stylus']);
});

// Default Task
gulp.task('default', ['stylus', 'scripts', 'watch']);
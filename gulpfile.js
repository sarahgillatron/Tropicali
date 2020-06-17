const { series } = require('gulp');
var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')


var browserSync = require('browser-sync').create()

var imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

function runSass() {
  return gulp.src('src/css/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCss({
        compatibility: 'ie8'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
}


function html() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest("dist"))
}

function fonts() {
 return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
}

function images() {
  return gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })

  gulp.watch("src/css/app.scss", runSass)
  gulp.watch('src/*.html', html).on('change', browserSync.reload)
  gulp.watch('src/fonts/*', fonts)
}





exports.default = series(images, fonts, runSass, html, watch);

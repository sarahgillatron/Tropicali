const { series, parallel } = require('gulp');
var gulp = require('gulp')
//css stuff

var cleanCss = require('gulp-clean-css')
var postcss = require('gulp-postcss')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')

//browser
var browserSync = require('browser-sync').create()

//images
var imagemin = require('gulp-imagemin')

//github
var ghpages = require('gh-pages')


function runCss() {
  return gulp.src([
    'src/css/reset.css',
    'src/css/typography.css',
    'src/css/app.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
       require("autoprefixer"),
       require("postcss-preset-env")({
         stage: 1,
         browsers: ['IE 11', 'last 2 versions']
       })
      ])
    )

    .pipe(concat("app.css"))

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

  gulp.watch("src/css/*", runCss)
  gulp.watch('src/*.html', html).on('change', browserSync.reload)
  gulp.watch('src/fonts/*', fonts)
}

function deploy (cb) {
  ghpages.publish("dist")
  cb();
}


exports.default = series(images, fonts, runCss, html, watch);
exports.deploy = deploy;

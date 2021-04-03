const gulp = require('gulp')
const { parallel } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')

function minifyCss(cb) {
    return gulp.src('public/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/dist'))
    cb()
}
function minifyJS(cb) {
    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'))
    cb()
}


exports.default = parallel(minifyCss, minifyJS)
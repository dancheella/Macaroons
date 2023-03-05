'use strict'

const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

exports.less = function () {
    return src('./src/css/*.less')
        .pipe(less())
        .pipe(concatCss("styles.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('./dist/css'));

}

exports.fonts = function() {
    return src('./src/fonts/**/*')
        .pipe(dest('dist/fonts'))
}

exports.watch = function() {
    watch('./src/css/*.less', series('less'));
    watch('./src/fonts/**/*', series('fonts'));
};
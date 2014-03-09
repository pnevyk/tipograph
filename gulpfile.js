var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

gulp.task('default', function () {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('dest'));
});
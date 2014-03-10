var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');
    
gulp.task('build', function () {
    gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest('dest'));
});

gulp.task('test', function () {
    gulp.src('test/*.js')
        .pipe(mocha({
            reporter : 'spec'
        }));
});

gulp.task('default', ['build', 'test']);
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    header = require('gulp-header');

var pkg = require('./package.json'),
    banner = '/* tipograph (<%= file %>) v<%= pkg.version %> by Petr Nevyhoštěný - https://github.com/nevyk/tipograph (MIT licensed) */\n';
    
gulp.task('build', function () {
    gulp.src('src/replace.js')
        .pipe(jshint())
        .pipe(uglify())
    	.pipe(header(banner, { pkg : pkg, file : 'replace' }))
        .pipe(gulp.dest('dest'));
    
    gulp.src('src/languages.js')
        .pipe(jshint())
        .pipe(uglify())
    	.pipe(header(banner, { pkg : pkg, file : 'languages' }))
        .pipe(gulp.dest('dest'));
});

gulp.task('test', function () {
    gulp.src('test/*.js')
        .pipe(mocha({
            reporter : 'spec'
        }));
});

gulp.task('default', ['build', 'test']);
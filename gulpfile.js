var gulp = require('gulp');
var util = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var os = require('os');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');

function onError(err) {
    util.log(util.colors.red(err.message));
}

gulp.task('scripts', function () {
    util.log(util.colors.bgBlue.bold('Compiling ---> JS ---> Bundles'));

        var b = browserify({
            entries: [
                '/Users/USNY-ZStallings/Desktop/projects/editor/psd/clientlibs/client.js'
            ],
            debug: true
        });

        return b.bundle()
            .pipe($.plumber({
                errorHandler: onError
            }))
            .pipe(source('bundle.js'))
            //.pipe($.sourcemaps.init({loadMaps: true}))
            //// Add transformation tasks to the pipeline here.
            ////.pipe(uglify())
            //.on('error', onError)
            //.pipe($.sourcemaps.write('.'))
            .pipe(gulp.dest('./dist/js'))

});




gulp.task('watch', ['scripts'], function () {
    util.log(util.colors.bgGreen.bold('Gulp is now watching for changes!'));

    $.livereload.listen({
        quiet: true
    });

    gulp.watch('./src/**/*.scss', ['styles']);
    gulp.watch(['./src/**/*.js'], ['jshint', 'scripts']);

    //runSequence(['open-app']);

});

gulp.task('default', ['watch']);
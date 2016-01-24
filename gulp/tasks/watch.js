var gulp        = require('gulp');
var util        = require('gulp-util');
var $           = require('gulp-load-plugins')();

module.exports = function () {
    util.log(util.colors.bgGreen.bold('Gulp is now watching for changes!'));

    $.livereload.listen({
        quiet: true
    });

    gulp.watch('/Users/USNY-ZStallings/Desktop/projects/electron-apps/menubar/components/**/*.scss', ['scss']);
    gulp.watch('/Users/USNY-ZStallings/Desktop/projects/electron-apps/menubar/components/**/*.js', ['js']);
};
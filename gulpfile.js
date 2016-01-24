var gulp = require('./gulp')([
    'scss',
    'scripts',
    'jstTemplates',
    'watch'
]);

//gulp.task('bundle');
gulp.task('build', ['scss', 'scripts', 'jstTemplates']);
gulp.task('default', ['build', 'watch']);
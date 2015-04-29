var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('nodemon');
var babelify = require('babelify');
var browserify = require('browserify');

var restart_nodemon = function () {
    setTimeout(function () {
        nodemon.emit('restart');
    }, 200);
};

gulp.task('nodemon_server', ['buildall'], function () {
    nodemon({
        ignore: '*',
        script: 'server.js',
        ext: 'do_not_watch'
    }).on('log', function (log) {
        gutil.log(log.colour);
    });
});

gulp.task('develop', ['nodemon_server']);
gulp.task('lint_all', ['lint_server', 'lint_js']);
gulp.task('buildall', ['lint_all', 'build_app']);
gulp.task('default', ['buildall']);

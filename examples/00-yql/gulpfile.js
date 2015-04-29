var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('nodemon');

// Start nodemon server
gulp.task('nodemon_server', function () {
    nodemon({
        script: 'server.js',
    }).on('log', function (log) {
        gutil.log(log.colour);
    });
});

gulp.task('default', ['nodemon_server']);

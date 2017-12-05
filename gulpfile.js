var gulp = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('jscs', function () {
    return gulp.src(['index.js', 'gulpfile.js', 'lib/*.js'])
        .pipe(jscs());
});


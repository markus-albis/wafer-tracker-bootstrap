var gulp = require('gulp');
var less = require('gulp-less');
var paths = require('../paths');


// Compile Our Less
gulp.task('less', function() {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest(paths.css));
});

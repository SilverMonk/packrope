var gulp = require('gulp');
var clean = require('gulp-clean');
var template = require('gulp-template');

gulp.task('clean', [], function() {
    return gulp.src('./dist/views', { read: false })
        .pipe(clean());
});
gulp.task('clean-release', [], function() {
    return gulp.src('./release/views', { read: false })
        .pipe(clean());
});

gulp.task('template', ['clean'], function() {
    var host = "http://localhost:8080/dist/"
    var data = {
        style_index: '<link href="' + host + 'styles/index.css" rel="stylesheet">',
        script_index: '<script src="' + host + 'scripts/index.js"></script>',

        style_detail: '<link href="' + host + 'styles/detail.css" rel="stylesheet">',
        script_detail: '<script src="' + host + 'scripts/detail.js"></script>',

        style_404: '<link href="' + host + 'styles/404.css" rel="stylesheet">',
        script_404: '<script src="' + host + 'scripts/404.js"></script>'
    }
    return gulp.src('src/views/**/*.html', ['clean'])
        .pipe(template(data))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('template-release', ['clean-release'], function() {
    var host = "./"
    var data = {
        style_index: '<link href="../styles/index.css" rel="stylesheet">',
        script_index: '<script src="../scripts/index.js"></script>',

        style_detail: '<link href="../styles/detail.css" rel="stylesheet">',
        script_detail: '<script src="../scripts/detail.js"></script>',

        style_404: '<link href="../styles/404.css" rel="stylesheet">',
        script_404: '<script src="../scripts/404.js"></script>'
    }
    return gulp.src('src/views/**/*.html', ['clean'])
        .pipe(template(data))
        .pipe(gulp.dest('release/views'));
});


gulp.task('twatch', ['template'], function() {
    gulp.watch('src/views/**/*.html', ['template']);
});

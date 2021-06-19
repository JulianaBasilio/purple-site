const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
 --- TOP LEVEL FUNCTIONS

    gulp.task - Define tasks
    gulp.src - Point to files to use
    gulp.dest - Points to folder to output
    gulp.watch - watch changes

*/

//Log message
gulp.task('message', async function(){
    return console.log("Gulp is running...");
});

//Copy HTML Files
gulp.task('copyHtml', async function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

//Optimize images
gulp.task('imageMin', async function(){
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
});

//Gulp Sass
gulp.task('sass', async function(){
    gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});

//Scripts concat and minify
gulp.task('scripts', async function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

//Gulp default
gulp.task('default', gulp.parallel(['message', 'copyHtml', 'imageMin', 'sass', 'scripts']));

//Gulp watch
gulp.task('watch', async function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});
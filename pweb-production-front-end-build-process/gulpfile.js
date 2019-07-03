/**
 * gulpfile.js
 */
var gulp = require('gulp');

/* plugins */
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var lesshint = require('gulp-lesshint');
// See http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/ for usage
var plumber = require('gulp-plumber');

/* Run all tasks and output to css folder  */
gulp.task('css', function() {
	return gulp.src('./less/*.less')
	.pipe(lesshint())
	.pipe(plumber({
	    errorHandler: function (err) {
	            console.log(err);
	            this.emit('end');
	    	}
		}
	))
	.pipe(lesshint.reporter()) // Leave empty to use the default, "stylish"
	.pipe(less())
	.pipe(autoprefixer({
	 	 browsers: ['last 3 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('./css'))

});

/* Watch Files For Changes */
gulp.task('watch', function() {
	gulp.watch('./less/*.less', ['css']);
});

/* Default Task */
gulp.task('default', ['css', 'watch']);
require('es6-promise').polyfill();
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');
var bourbon = require('node-bourbon').includePaths;
var neat = require('node-neat').includePaths;
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var cleanCSS = require('gulp-clean-css');

gulp.task('js', function() {
	gulp.src('js/app.js')
	.pipe(babel({
		presets: [
			'babel-preset-es2015'
		]
	}))
	.pipe(gulp.dest('dist'))
	}
);

var onError = function(err) {
	console.log('Si è presentato un errore: ', gutil.color.magenta(err.message));
	gutil.beep();
	this.emit('end');
}	

gulp.task('sass', function() {
	return gulp.src('./sass/style.scss')
	.pipe(sass({
		includePaths: [bourbon, neat]
	}))
	.pipe(autoprefixer())
	.pipe(gulp.dest('./'))
	.pipe(plumber({errorHandler: onError}))
  .pipe(connect.reload())	
});

gulp.task('min', function() {
	return gulp.src('./style.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./'));
})

gulp.task('images', function() {
	return gulp.src('./images/scr/*')
	.pipe(plumber({errorHandler: onError}))
	.pipe(imagemin({optimizationLevel: 7, progressive: true}))
	.pipe(gulp.dest('/images/dist'));
})

gulp.task('watch', function() {
	browserSync.init({
		files: './',
		proxy: 'localhost:3000',
		port: '3004'
	})
	gulp.watch('./sass/**/*.scss', ['sass']);
	gulp.watch('./images/src/*', ['images']);
	gulp.watch('./js/**/*.js', ['js']);
});

gulp.task('connect', function() {
	connect.server({
		root: '.',
		livereload: true
	})
})

gulp.task('default', ['sass', 'watch', 'images', 'min', 'js']);


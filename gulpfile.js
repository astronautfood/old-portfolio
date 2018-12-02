const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

gulp.task('html', () => {
	return gulp.src('dev/index.html')

});

gulp.task('styles', () => {
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(concat('style.css'))
		.pipe(cleancss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/styles'))
});

gulp.task('assets', () => {
	return gulp.src('dev/assets/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng({ optimizarionLevel: 5 })
		])))
		.pipe(gulp.dest('./dist/assets'))
});

gulp.task('fonts', () => {
	return gulp.src('dev/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts'))
})


gulp.task('js', () => {
	browserify('dev/scripts/app.js', { debug: true })
		.transform('babelify', {
			sourceMaps: true,
			presets: ['es2015']
		})
		.bundle()
		.on('error', notify.onError({
			message: "Error: <%= error.message %>",
			title: '✋'
		}))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(reload({ stream: true }));
});

gulp.task('bs', () => {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', ['bs', 'styles', 'html', 'assets', 'fonts', 'js'], () => {
	gulp.watch('dev/**/*.js', ['js']);
	gulp.watch('dev/**/*.scss', ['styles']);
	gulp.watch('./dist/styles/style.css', reload);
	gulp.watch('./index.html', reload);
});
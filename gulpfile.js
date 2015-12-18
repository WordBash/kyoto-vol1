var gulp         = require( 'gulp' );
var watch        = require( 'gulp-watch' );
var sass         = require( 'gulp-sass' );
var cssmin       = require( 'gulp-minify-css' );
var rename       = require( 'gulp-rename' );
var uglifyjs     = require( 'gulp-uglifyjs' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var browser_sync = require( 'browser-sync' );
var autoprefixer = require( 'gulp-autoprefixer' );

gulp.task( 'sass', function() {
	return gulp.src( './assets/src/scss/*.scss' )
		.pipe( sass() )
		.pipe( autoprefixer( {
			browsers: ['last 2 versions'],
			cascade: false
		} ) )
		.pipe( gulp.dest( './assets/dest/css/' ) )
		.on( 'end', function() {
			gulp.src( ['./assets/dest/css/*.css', '!./assets/dest/css/*.min.css'] )
				.pipe( cssmin( {
					keepSpecialComments: 0
				} ) )
				.pipe( rename( { suffix: '.min' } ) )
				.pipe( gulp.dest( './assets/dest/css/' ) );
		} );
} );

gulp.task( 'browserify', function() {
	return browserify( './assets/src/js/app.js' )
		.transform( 'browserify-shim' )
		.bundle()
		.pipe( source( 'app.js' ) )
		.pipe( gulp.dest( './assets/dest/js/' ) )
		.on( 'end', function() {
			gulp.src( ['./assets/dest/js/app.js'] )
				.pipe( uglifyjs( 'app.min.js' ) )
				.pipe( gulp.dest( './assets/dest/js/' ) );
		} );
} );

gulp.task( 'browsersync', function() {
	browser_sync.init( {
		proxy: '127.0.0.1:8080'
	} );
} );

gulp.task( 'watch', ['sass', 'browserify'], function() {
	gulp.watch( ['assets/src/scss/**/*.scss', 'assets/src/scss/*.scss'], ['sass'] );
	gulp.watch( ['assets/src/js/**/*.js', 'assets/src/js/*.js'], ['browserify'] );
	//gulp.watch( ['**/*.html', './assets/dest/**/*.min.js', './assets/dest/**/*.min.css'], function() {
	//	browser_sync.reload();
	//} );
} );

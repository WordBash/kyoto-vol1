'use strict';

// ==================================
//
// distribution
//
// ==================================
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('copy', function() {
	return gulp.src(
		[
			'./**/*.html',
			'./**/CNAME',
			'./**/*.ico',
			'./assets/**',
			"!./release/**",
			"!./node_modules/**/*.*"
		],
		{ base: './' }
		)
		.pipe( gulp.dest( 'release' ) );
} );

gulp.task('release', function(cb){
	return runSequence( 'build:dist', 'copy', cb );
});

'use strict';

// ==================================
//
// Load modules.
//
// ==================================

var gulp = require('gulp');

// ==================================
//
// tasks.
//
// ==================================


gulp.task('build', [ 'sass', 'images', 'browserify']);
gulp.task('build:dist', ['build', 'sass:dist', 'browserify:dist']);

gulp.task('default', ['setWatch', 'build', 'watch', 'browserSync']);

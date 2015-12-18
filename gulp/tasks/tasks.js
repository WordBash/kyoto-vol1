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


gulp.task('build',      ['images', 'sass', 'browserify']);
gulp.task('build:dist', ['images', 'sass:dist', 'browserify:dist']);

gulp.task('default', ['setWatch', 'build', 'watch', 'browserSync']);

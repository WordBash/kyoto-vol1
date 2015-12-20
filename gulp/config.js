
var dir;

dir = {
	assets: './assets',
	src: './assets/src',
	dist: './assets/dest'
};




module.exports = {

	images: {
		src: dir.src + '/images/**/*.{png,jpg,gif,svg,jpg}',
		dest: dir.dist + '/images'
	},

	/**
	 *
	 * browserSync.
	 *
	 */
	browserSync: {
		server: {
			baseDir: './'
		},
		files: [
			"./**/*.php",
			"./**/*.html",
			dir.dist + '/**',
		]
	},

	/**
	 *
	 * sass Compile Option.
	 *
	 */
	sass: {
		src: dir.src + '/scss/**/*.scss',
		dest: dir.dist + '/css'
	},

	/**
	 *
	 * JavaScript.
	 *
	 */
	browserify: {
		bundleOption: {
			cache: {}, packageCache: {}, fullPaths: false,
			debug: true,
			entries: dir.src + '/js/app.js',
			extensions: ['.js', '.jsx'],
		},
		dest: dir.dist + '/js/',
		filename: 'app.js'

	}
};


var gulp = require("gulp");
var ts = require("gulp-typescript"); // a gulp plugin for TypeScript.
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});


/* 
// for watchify
var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var tsify = require('tsify')
var watchify = require('watchify')
var fancy_log = require('fancy-log')
const buffer = require('vinyl-buffer')
var path = {
  pages: ['src/*.html'],
}



var watchedBrowserify = watchify(
  browserify({
    basedir: '.',
    debug: true, // emit source maps
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
  })
  .plugin(tsify)
  
)

gulp.task('copy-html', function () {
  return gulp.src(path.pages).pipe(gulp.dest('dist-for-watchify'))
})

function bundle() {
  return watchedBrowserify
    .bundle()
    .on('error', fancy_log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist-for-watchify'))
}

gulp.task('default', gulp.series(gulp.parallel('copy-html', bundle)))
watchedBrowserify.on('update', bundle)
watchedBrowserify.on('log', fancy_log) 
 */

/* 
// for terser
var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var terser = require('gulp-terser')
var tsify = require('tsify')
var sourcemaps = require('gulp-sourcemaps')
var buffer = require('vinyl-buffer')
var paths = {
  pages: ['src/*.html']
}

gulp.task('copy-html', function () {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series(gulp.parallel('copy-html'), function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
  .pipe(terser())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'))
}))
 */

/*
// for babel
var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var tsify = require('tsify')
var sourcemaps = require('gulp-sourcemaps')
var buffer = require('vinyl-buffer')
var paths = {
  pages: ['src/*.html'],
}

gulp.task('copy-html', function () {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series(gulp.parallel('copy-html'), function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {},
  })
  .plugin(tsify)
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts'], // By default Babelify will only process files with extensions of .js, .es, .es6 and .jsx so we need to add the .ts extension as an option to Babelify.
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist'))
}))
*/
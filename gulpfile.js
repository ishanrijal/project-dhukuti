const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const replace = require('gulp-replace');


//paths
const paths = {
    indexHtml: "./index.html",
    html     : "./**/*.html",
    sass     : "./src/sass/**/*.{sass,scss}",
    css      : "./assets/css",
    js       : "./src/js/**/*.js",
    jsmin    : "./assets/js",
};

// Compile SASS to CSS (Development)
function compileSassDev() {
  return gulp
    .src(paths.sass)
    .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(sass().on("error", sass.logError)) // Compile SASS/SCSS
    .pipe(sourcemaps.write(".")) // Write sourcemaps
    .pipe(gulp.dest(paths.css)) // Output to destination
    .pipe(browserSync.stream()); // Inject changes
}

// Compile SASS to CSS (Production)
function compileSassProd() {
    return gulp
      .src(paths.sass)
      .pipe(sass().on("error", sass.logError)) // Compile SASS/SCSS
      .pipe(cleanCSS()) // Minify CSS
      .pipe(gulp.dest(paths.css)); // Output to destination
}
  
// Minify and concatenate JS (Development)
function minifyJsDev() {
    return gulp
        .src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat("main.js")) 
        .pipe(sourcemaps.write(".")) 
        .pipe(gulp.dest(paths.jsmin))
        .pipe(browserSync.stream()); // Inject changes
}
  
// Minify and concatenate JS (Production)
function minifyJsProd() {
    return gulp
        .src(paths.js)
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.jsmin));
}
  
function updateIndexHtml() {
    return gulp
        .src(paths.html)
        .pipe(replace("assets/css/style.css", "assets/css/style.min.css")) // Update CSS path
        .pipe(replace("assets/js/main.js", "assets/js/main.min.js")) // Update JS path
        .pipe(gulp.dest("./")); // Output updated HTML
}

//modify the min to unminify for dev
function updateIndexHtmlDev() {
    return gulp
        .src(paths.html)
        .pipe(replace("assets/css/style.min.css", "assets/css/style.css")) // Update CSS path
        .pipe(replace("assets/js/main.min.js", "assets/js/main.js")) // Update JS path
        .pipe(gulp.dest("./")); // Output updated HTML
}

// Live reload and watch
function watchFiles() {
    browserSync.init({
        server: {
        baseDir: "./",
        },
    });
          
    gulp.watch(paths.sass, compileSassDev); // Watch SASS/SCSS files
    gulp.watch(paths.js, minifyJsDev); // Watch JS files
    gulp.watch(paths.html).on("change", browserSync.reload); // Watch HTML files
}

// Export tasks
exports.sassDev = compileSassDev;
exports.sassProd = compileSassProd;
exports.jsDev = minifyJsDev;
exports.jsProd = minifyJsProd;
exports.updateIndexHtml = updateIndexHtml;
exports.updateIndexHtmlDev = updateIndexHtmlDev;
exports.watch = watchFiles;
  
// Default task (Live development)
exports.default = gulp.series(updateIndexHtmlDev, compileSassDev, minifyJsDev, watchFiles);

// Build task (Production release)
exports.build = gulp.series(compileSassProd, minifyJsProd,updateIndexHtml);
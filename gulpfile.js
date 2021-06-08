
// Requires

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

//
// Clean
// ==========================================================================

// Clean docs Folder
function clean() {
    return del(['./docs']);
}

// gulp.task('clean:dist', gulp.series('clean'));

//
// Browser Preview
// ==========================================================================

// BrowserSync
function browser_sync(done) {
    browserSync.init({
        server: {
            baseDir: './docs',
        },
        port: '8081',
    });
    done();
}

// BrowserSync Reload
function browser_sync_reload(done) {
    browserSync.reload();
    done();
}

//
// CSS
// ==========================================================================

// Compile SASS
function scss() {
    return gulp
        .src('./app/scss/styles.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
}

// Minify CSS
function css() {
    return gulp
        .src('./app/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./docs/css'));
}

// Migrate CSS Plugins
function css_plugins() {
    return gulp
        .src('./app/css/plugins/*.css')
        .pipe(gulp.dest('./docs/css/plugins'));
}

// CSS Build Sequence - Compile Sass, then Minify CSS
const styles = gulp.series(scss, css);

//
// JS
// ==========================================================================

// Global
// ======

// Concatenate JS Files into one main.js file
function js_concat() {
    return gulp
        .src(['./app/js/_dev/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./app/js'));
}

// Compress and migrate main.js file
function js_compress() {
    return gulp.src('./app/js/main.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./docs/js'));
}

// Migrate JS Plugins
function js_plugins(done) {
    gulp
        .src('app/js/plugins/*.js')
        .pipe(gulp.dest('docs/js/plugins'));

    done(); // <-- This is required to avoid async errors
}

// JS Build Sequence
const scripts = gulp.series(js_concat, js_compress);


//
// Migrate HTML, Fonts, Images and Icons
// ==========================================================================

// Copy Fonts to 'docs'
function fonts() {
    return gulp
        .src('./app/fonts/**/*')
        .pipe(gulp.dest('./docs/fonts'));
}

// Copy HTML to 'docs'
function html() {
    return gulp
        .src(['./app/*.{html,htm,php}'])
        .pipe(gulp.dest('./docs'));
}

function cname(){
    return gulp
        .src('./app/CNAME')
        .pipe(gulp.dest('./docs'));
}

// Copy Images to 'docs'
function images() {
    return gulp
        .src('./app/img/**/*')
        .pipe(gulp.dest('./docs/img'));
}

// Copy icons to 'docs'
function icons() {
    return gulp
        .src('./app/*.{png,ico}')
        .pipe(gulp.dest('./docs'));
}

// Copy data to 'docs'
function data() {
    return gulp
        .src('./app/data/*.{json,xml}')
        .pipe(gulp.dest('./docs/data'));
}

// Migration Sequence
const assets = gulp.series(cname, fonts, html, images, icons, data, css_plugins, js_plugins);

//
// Watch
// ==========================================================================

function watch_files() {
    // Watch SCSS Files for Changes
    gulp.watch('./app/scss/**/*.scss', styles);

    // Watch JS Files for Changes
    gulp.watch('./app/js/_dev/**/*.js', gulp.series(js_concat, js_compress));

    // Watch HTML, HTM and PHP files for Changes
    gulp.watch('app/*.{html,htm,php}', html);

    gulp.watch(
        [
            './docs/css/**/*',
            './docs/*.{html,htm,php}',
            './docs/js/**/*'
        ],
        browser_sync_reload
    );

    gulp.watch('.app/img/**/*', images);
}

const watch = gulp.parallel(watch_files, browser_sync);

//
// Main Build Sequence
// ==========================================================================

const build = gulp.series(clean, gulp.parallel(assets, scripts, styles), watch);

//
// Exports
// ==========================================================================

exports.assets = assets;
exports.css = styles;
exports.js = scripts;
exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.default = build;
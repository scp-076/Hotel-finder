    // import babelRegister from 'babel-register';

import gulp from 'gulp'; //+
import babel from 'gulp-babel'; //+
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import notify from 'gulp-notify';//+ error code
import sourcemaps  from 'gulp-sourcemaps'; //+
import autoprefixer from 'gulp-autoprefixer';
import rigger from 'gulp-rigger'; //for HTML imports //==
import browserSync from 'browser-sync';
const sync = browserSync.create();
import del from 'del'; //+
import sass from 'gulp-sass'; //+
sass.compiler = require('node-sass'); //+
import combiner from 'stream-combiner2'; //+
const combine = combiner.obj;
import imagemin from 'gulp-imagemin';
import gcmq from 'gulp-group-css-media-queries';

const paths = {
    styles: {
        src: 'src/css/main.sass',
        watch: 'src/css/**/*.*',
        dest: 'build/css/'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'build/js/'
    },
    html:{
        src: 'src/*.html',
        watch: 'src/**/*.html',
        dest: 'build'
    },
    img:{
        src: 'src/images/**/*.*',
        dest: 'build/images/'
    },
    other:{
        src: 'src/other/**/*.*',
        dest: 'build/'
    }
};

export function html(){
    return combine(
        gulp.src(paths.html.src), // выбор всех html файлов по указанному пути
        rigger(), // импорт вложений
        gulp.dest(paths.html.dest),
    ).on('error', notify.onError());
}

export function images (){
    return ( gulp.src(paths.img.src)
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
                ],{
                    verbose: true
                }
            ))
            .pipe(gulp.dest(paths.img.dest)));
}

export function imgFastCopy(){
    return gulp.src(paths.img.src)
        .pipe(gulp.dest(paths.img.dest));
}

export function otherCopy(){
    return gulp.src(paths.other.src)
        .pipe(gulp.dest(paths.other.dest));
}

export function styles() {
    return combine(
        gulp.src(paths.styles.src),
        sourcemaps.init(), //sourcemaps for development mode
        sass({ outputStyle: 'expand' }), // {outputStyle: 'expand' for nonminify style file, 'compressed' for minify
        gcmq(),
        // cleanCSS(),
        // sourcemaps.write(), //sourcemaps for development mode
        autoprefixer(['last 15 versions']),
        // rename({ suffix: '.min'}),// pass in options to the stream
        sourcemaps.write(), //sourcemaps for development mode
        gulp.dest(paths.styles.dest)
    ).on('error', notify.onError());
}

export function stylesClean() {
    return combine(
        gulp.src(paths.styles.src),
        sass({ outputStyle: 'expand' }), // {outputStyle: 'expand'} for nonminify style file
        gcmq(),
        // cleanCSS(),
        autoprefixer(['last 15 versions']),
        // rename({ suffix: '.min'}),// pass in options to the stream
        gulp.dest(paths.styles.dest)
    ).on('error', notify.onError());
}

export function scripts() {
    return combine(
            gulp.src(paths.scripts.src),//(paths.scripts.src, { sourcemaps: true })
            sourcemaps.init(), //sourcemaps for development mode
            babel(),
            // uglify(),
            sourcemaps.write(), //sourcemaps for development mode
            concat('main.min.js'),
            gulp.dest(paths.scripts.dest)
        ).on('error', notify.onError());
}

export function scriptsClean() {
    return combine(
        gulp.src(paths.scripts.src),//(paths.scripts.src, { sourcemaps: true })
        babel(),
        uglify(),
        concat('main.min.js'),
        gulp.dest(paths.scripts.dest)
    ).on('error', notify.onError());
}

export function watchFiles() {
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.watch, styles);
    gulp.watch(paths.html.watch, html);
    gulp.watch(paths.img.src, imgFastCopy);
};


export function server() {
    sync.init({
        server: 'build',
        port: 3030
        // open: false,
        // tunnel: true,
        // tunnel: 'new-age'
    });
    sync.watch('build/**/*.*').on('change', sync.reload);
};

export const clean = () => del(['build/**']);

export const build = gulp.series(clean, gulp.parallel(styles, scripts, imgFastCopy, otherCopy, html)); // IMaGeS???

export const develop = gulp.series(build, gulp.parallel(watchFiles, server));

export const deploy = gulp.series(clean, gulp.parallel(stylesClean, scriptsClean, html, images, otherCopy)); // IMaGeS??? rsync...

export default develop;
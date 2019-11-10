'use strict';

const {
    series,
    src,
    dest,
    watch
} = require('gulp');

const sass = require('gulp-sass');
const inject = require('gulp-inject');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const files = {
    sassPath: 'src/sass/**/*.scss',
    devJsPath: 'src/script/**/*.js',
    distJsPath: './dist/script',
    devIndexHtmlPath: 'src/index.html',
    distIndexHtmlPath: './dist/index.html',
    cssPath: './dist/css/**/*.css',
    jsPath: './dist/script/**/*.js'
}

function copyTask() {
    return src(files.devIndexHtmlPath)
        .pipe(dest('dist/'));
}

function scssTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css/'));
}

function injecCompiled() {
    return src(files.distIndexHtmlPath).
    pipe(inject(src(files.cssPath), {
            ignorePath: 'dist/',
            addRootSlash: false
        }, {read: false}))
        .pipe(inject(src(files.jsPath), {
            transform: filepath => `<script async src="${filepath}"></script>`,
            ignorePath: 'dist/',
            addRootSlash: false
        }, {read: false}))
        .pipe(dest('./dist/'))
}

function concatJs() {
    return src(files.devJsPath)
        .pipe(concat('app.js'))
        .pipe(dest(files.distJsPath));
}


function devTask(cb) {
    watch(files.devIndexHtmlPath, series(copyTask, injecCompiled));
    watch(files.sassPath, scssTask);
    watch(files.devJsPath, concatJs);
    cb()
}



module.exports.build = series(copyTask, scssTask, concatJs, injecCompiled);
module.exports.dev = devTask;
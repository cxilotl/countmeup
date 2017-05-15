'use strict';

var isProduction = false;

var gulp        = require('gulp'),
    runSequence = require('run-sequence'),
    gutil       = require('gulp-util'),
    env         = require('gulp-env'),
    eslint      = require('gulp-eslint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    del         = require('del'),
    nodemon     = require('gulp-nodemon'),
    mocha       = require('gulp-mocha'),
    supertest   = require('supertest');

var paths = {
    initData            : 'originaldata/*.json',
    workingData         : 'data/',
    serverScript        : 'server.js',
    srcScripts          : 'src/**/*.js',
    helpersScripts      : 'helpers/*.js',
    routesScripts       : 'routes/*.js',
    controllersScripts  : 'controllers/*.js',
    testScripts         : 'test/**/*.js',
    buildFolder         : 'build',
    distFolder          : 'dist',
    excludeScripts      : ['./node_modules/**']
};

var buildFileName = 'server.min.js';
var distFileName = '';  // TODO: To be defined

gulp.task('default', ['run-server']);

// Running the main server - needs to be build before hand
gulp.task('run-server', function() {
    nodemon({
        script: paths.buildFolder + '/' + buildFileName,
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: [
            './node_modules/**'
        ]
    })
    .on('restart', function() {
        console.log('Restarting main server');
    });
});

// Running the dev server
gulp.task('run-dev-server', function() {
    nodemon({
        script: paths.serverScript,
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: [
            './node_modules/**'
        ]
    })
    .on('restart', function() {
        console.log('Restarting dev server');
    });
});


// Running watcher
gulp.task('watch', function() {
    gulp.watch([
        paths.serverScript,
        paths.srcScripts,
        paths.helpersScripts,
        paths.routesScripts,
        paths.controllersScripts,
        paths.testScripts
    ], ['eslint', 'test']);
});


// Building project
gulp.task('build', ['clean'], function(cb) {
    runSequence([
        'copy-init-data',
        'test',
        'minify'
    ], cb);
});


// Copy default candidates, voters, and candidate-votes files to folder that is used by the app
gulp.task('copy-init-data', function() {
    // del([ paths.workingData ]);
    return gulp.src(paths.initData)
        .pipe( gulp.dest(paths.workingData) );
});


// Running unit and Integration testing
gulp.task('test', function() {
    env({ vars: { ENV: 'Test' } });
    return gulp.src(paths.testScripts, { read: false })
        .pipe( mocha({ reporter: 'nyan' }) )
        .on('error', gutil.log);
});


// Removing build data
gulp.task('clean', function() {
    return del([ paths.buildFolder ]);
});


// Minifying scripts
gulp.task('minify', function() {
    return gulp.src([
            paths.srcScripts,
            paths.helpersScripts,
            paths.routesScripts,
            paths.controllersScripts,
            './' + paths.serverScript
        ])
        .pipe(uglify())
        // .pipe(concat('server.min.js'))
        .pipe(concat())
        .pipe(gulp.dest(paths.buildFolder));
});

// Linting javascript files
gulp.task('eslint', function() {
    return gulp.src([
            './' + paths.serverScript,
            paths.srcScripts,
            paths.helpersScripts,
            paths.routesScripts,
            paths.controllersScripts,
            '!./node_modules/**'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
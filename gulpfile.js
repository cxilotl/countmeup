var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    env         = require('gulp-env'),
    nodemon     = require('gulp-nodemon'),
    mocha       = require('gulp-mocha'),
    supertest   = require('supertest');

var paths = {
    initData        : 'originaldata/*.json',
    workingData     : 'data/',
    srsScripts      : 'src/**/*.js',
    testScripts     : 'tests/**/*.js',
    excludeScripts  : ['./node_modules/**']
};

gulp.task('default', ['run-server']);

// Running the server
gulp.task('run-server', function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT:8000
        },
        ignore: [
            './node_modules/**'
        ]
    })
    .on('restart', function() {
        console.log('Restarting server');
    });
});

// Copy default candidates, voters, and candidate-votes files to folder that is used by the app
gulp.task('copy-init-data', function() {
    return gulp.src(paths.initData)
        .pipe( gulp.dest(paths.workingData) );
});

// Running unit and Integration testing
gulp.task('test', function() {
    env({ vars: { ENV: 'Test' } });
    gulp.src(paths.testScripts, { read: false })
        .pipe( mocha({ reporter: 'nyan' }) )
        .on('error', gutil.log);
});
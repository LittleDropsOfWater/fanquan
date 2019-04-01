const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('default', () => {
    gulp.src('./web')
        .pipe(webserver({
            port: 8010,
            livereload: true,
            open: true,
            proxies: [{
                source: '/api/getData',
                target: 'http://localhost:3000/getData'
            }]
        }))
})
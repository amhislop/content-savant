const gulp = require('gulp');
const $ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'gulp.*',
    '@*/gulp{-,.}*',
    'vinyl-*',
    'browserify**',
    'babelify**'
  ],
  replaceString: /^gulp(-|\.)|^vinyl-(source-)*/
});
const browserSync = require('browser-sync').create();

const jsSRC = 'assets/src/js/app.js';
const jsDist = 'assets/dist/js';
const cssSRC = 'assets/src/scss/base.scss';
const cssDIST = 'assets/dist/css';

let proxy = 'savant.test';

/*
 * Clean
 */
gulp.task('clean', () =>
  gulp
    .src(`${cssDIST}/base.min.css`, { read: false, allowEmpty: true })
    .pipe($.clean())
);

/*
 * JS
 */
gulp.task('js', () =>
  $.browserify({ entries: [jsSRC] })
    .transform($.babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react']
    })
    .bundle()
    .pipe($.stream(jsSRC))
    .pipe($.rename('bundle.js'))
    .pipe($.buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(jsDist))
);

/*
 * CSS
 */
gulp.task('scss', () =>
  gulp
    .src(cssSRC)
    .pipe($.cssGlobbing({ extensions: ['.scss'] }))
    .pipe($.sass({ style: 'compressed' }))
    .on('error', $.sass.logError)
    .on('error', err => {
      $.notify().write(err);
    })
    .pipe(
      $.autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9'],
        cascade: false
      })
    )
    .pipe($.rename('base.min.css'))
    .pipe(gulp.dest(cssDIST))
    .pipe(browserSync.stream({ match: '**/*.css' }))
);

/*
 * Javascript watch
 */
gulp.task('js-watch', done => {
  browserSync.reload();
  done();
});

/*
 * Serve and watch for changes
 */
gulp.task('watch', () => {
  // Serve
  browserSync.init({
    proxy,
    ghostMode: false
  });
  //   gulp.watch('assets/js/src/modules/*.js', gulp.series('js'));
  gulp.watch('assets/src/js/**/*.js', gulp.series('js', 'js-watch'));
  gulp.watch('assets/src/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('default', gulp.series('js', 'clean', 'scss', 'watch'));

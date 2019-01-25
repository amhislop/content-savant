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

const jsSRC = 'assets/src/js/app.js';
const jsDist = 'assets/dist/js';
const cssSRC = 'assets/src/sass/base.sass';
const cssDIST = 'assets/dist/css';

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
    .transform($.babelify, { presets: ['@babel/preset-env'] })
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
gulp.task('sass', () =>
  gulp
    .src(cssSRC)
    .pipe($.cssGlobbing({ extensions: ['.sass'] }))
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
);

/*
 * Serve and watch for changes
 */
gulp.task('watch', () => {
  //   gulp.watch('assets/js/src/modules/*.js', gulp.series('js'));
  gulp.watch('assets/src/js/**/*.js', gulp.series('js'));
  gulp.watch('assets/src/sass/**/*.sass', gulp.series('sass'));
});

gulp.task('default', gulp.series('js', 'clean', 'sass', 'watch'));

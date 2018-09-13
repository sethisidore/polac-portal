const gulp = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
// const imagemin = require('gulp-imagemin');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const { Server } = require('karma');
const rimraf = require('rimraf');
// const eslint = require('')

/**
 * Run test once and exit
 */
gulp.task('test', (done) => {
  new Server({
    configFile: `${__dirname}/karma.conf.js`,
    singleRun: true,
  }, done).start();
});

// Reload browser on file change
gulp.task('browser-sync', () => {
  const files = [
    'app/**/*.html',
    'app/**/*.css',
    'app/**/*.png',
    'app/**/!(*.spec).js',
  ];

  browserSync.init(files, {
    server: {
      baseDir: './client/app',
    },
  });
});

gulp.task('minifyJs', () => gulp.src([
  'client/app/**/*.module.js', 'client/app/**/*.config.js',
  'client/app/**/!(*.spec).js'], { base: 'client/app' })
  .pipe(sourcemaps.init())
  .pipe(terser({
    warnings: 'true',
    ecma: 8,
  }))
  .pipe(concat('app.min.js'))
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('client/dist/js')));

gulp.task('cleanJs', (done) => {
  rimraf('client/dist/js/*.*', done);
});

gulp.task('buildJs', gulp.series('cleanJs', 'minifyJs', (done) => {
  console.log('build successful');
  done();
}));

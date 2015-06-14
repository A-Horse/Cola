var fs = require('fs');
var path = require('path');

var gulp = require('gulp');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var dirs = pkg['h5bp-configs'].directories;

// ---------------------------------------------------------------------
// | Var                                                               |
// ---------------------------------------------------------------------
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var requirejsOptimize = require('gulp-requirejs-optimize');


// ---------------------------------------------------------------------
// | Task                                                        |
// ---------------------------------------------------------------------

//Sass part
//
gulp.task('sass:foundation', function(){
  gulp.src(['components/foundation/scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});

gulp.task('sass:bootstrap', function(){
  gulp.src(['components/bootstrap/stylesheets/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});


gulp.task('sass:cola', function(){
  gulp.src(['components/cola/scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(gulp.dest('../Guess-Game/front/app/css/vendor'))
    .pipe(connect.reload())
    .pipe(livereload());
});

gulp.task('sass:app', function(){
  gulp.src(['scss/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});


gulp.task('sass:font-awesome', function(){
  gulp.src(['components/font-awesome/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(livereload());
});


//concat javascript
gulp.task('concat:cola', function() {
  return gulp.src([
    'components/cola/js/cola.js',
    'components/cola/js/announcement.js',
    'components/cola/js/dialogs.js',
    'components/cola/js/hamburger.js',
    'components/cola/js/wave.js',
  ])
    .pipe(concat('cola.js'))
    .pipe(gulp.dest('app/js/lib'));
});


//watch part
//
gulp.task('watch:foundation', function(){
  gulp.watch(['components/foundation/scss/**/*.scss'],
            ['sass:foundation']);
});

gulp.task('watch:bootstrap', function(){
  gulp.watch(['components/bootstrap/stylesheets/**/*.scss'],
             ['sass:bootstrap']);
});

gulp.task('watch:cola', function(){
  gulp.watch(['components/cola/scss/**/*.scss'],
             ['sass:cola']);
  gulp.watch(['components/cola/js/**/*.js'],
             ['concat:cola']);
});

gulp.task('watch:font-awesome', function(){
  gulp.watch(['components/font-awesome/**/*.scss'],
             ['sass:font-awesome']);
});

gulp.task('watch:app', function(){
  gulp.watch(['scss/**/*.scss'],
             ['sass:app']);
});

//requirejs optimize
gulp.task('optimize:cola', function () {
  return gulp.src('components/cola/amd/cola.js')
    .pipe(requirejsOptimize())
    .pipe(gulp.dest('dist'));
});

gulp.task('noptimize:cola', function () {
  return gulp.src('components/cola/amd/cola.js')
    .pipe(requirejsOptimize({
      optimize: 'none',
    }))
    .pipe(gulp.dest('dist'));
});

//uglify
gulp.task('compress:cola', function() {
  return gulp.src('app/js/lib/cola.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

//connect
//
gulp.task('connect', function(){
  connect.server({
    root: "app",
    host: "0.0.0.0",
    port: 7777,
    livereload: true
  });
});

gulp.task('connect:html', function() {
  gulp.src('app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('connect:css', function() {
  gulp.src('app/css/**/*.css')
    .pipe(connect.reload());
});

//connection:watch
//

gulp.task('connect:watch', function() {
  gulp.watch(['app/**/*.html'], ['connect:html']);
  gulp.watch(['app/css/**/*.css'], [ 'connect:css']);
});



// ---------------------------------------------------------------------
// | My Part Task                                                |
// ---------------------------------------------------------------------

gulp.task('watch', function(){

});

gulp.task('serve',
          ['sass:bootstrap',
           'sass:foundation',
           'sass:cola',
           'sass:app',
           'sass:font-awesome',
           'connect',
           'connect:html',
           'connect:css',
           'connect:watch',
           'watch:foundation',
           'watch:bootstrap',
           'watch:cola',
           'watch:app',
           'watch:font-awesome'
          ]);

gulp.task('compress',
          ['compress:cola']);

gulp.task('optimize',
         ['optimize:cola']);

gulp.task('noptimize',
          ['noptimize:cola']);


gulp.task('amdclean', function() {
  var requirejs = require('requirejs');

  requirejs.optimize({
    'findNestedDependencies': true,
    'baseUrl': './components/cola/amd/',
    'optimize': 'none',
    'include': ['cola'],
    'out': './dist/cola.js',
    'onModuleBundleComplete': function(data) {
      var fs = require('fs'),
          amdclean = require('amdclean'),
          outputFile = data.path;

      fs.writeFileSync(outputFile, amdclean.clean({
        'filePath': outputFile
      }));
    }
  });
});
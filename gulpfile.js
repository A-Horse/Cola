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
// | My Var                                                               |
// ---------------------------------------------------------------------
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve(dirs.archive), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve(dirs.archive, pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        'cwd': dirs.dist,
        'dot': true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve(dirs.dist, file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            'name': file,
            'mode': fs.statSync(filePath)
        });

    });

    archiver.pipe(output);
    archiver.finalize();

});

gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist
    ], done);
});

gulp.task('copy', [
    'copy:.htaccess',
    'copy:index.html',
    'copy:jquery',
    'copy:license',
    'copy:main.css',
    'copy:misc',
    'copy:normalize'
]);

gulp.task('copy:.htaccess', function () {
    return gulp.src('node_modules/apache-server-configs/dist/.htaccess')
               .pipe(plugins.replace(/# ErrorDocument/g, 'ErrorDocument'))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:index.html', function () {
    return gulp.src(dirs.src + '/index.html')
               .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.devDependencies.jquery))
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:jquery', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js'])
               .pipe(plugins.rename('jquery-' + pkg.devDependencies.jquery + '.min.js'))
               .pipe(gulp.dest(dirs.dist + '/js/vendor'));
});

gulp.task('copy:license', function () {
    return gulp.src('LICENSE.txt')
               .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:main.css', function () {

    var banner = '/*! HTML5 Boilerplate v' + pkg.version +
                    ' | ' + pkg.license.type + ' License' +
                    ' | ' + pkg.homepage + ' */\n\n';

    return gulp.src(dirs.src + '/css/main.css')
               .pipe(plugins.header(banner))
               .pipe(plugins.autoprefixer({
                   browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
                   cascade: false
               }))
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        dirs.src + '/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!' + dirs.src + '/css/main.css',
        '!' + dirs.src + '/index.html'

    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:normalize', function () {
    return gulp.src('node_modules/normalize.css/normalize.css')
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
        'copy',
    done);
});

//gulp.task('default', ['build']);


// ---------------------------------------------------------------------
// | My Part                                                        |
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
});

gulp.task('watch:app', function(){
  gulp.watch(['scss/**/*.scss'],
             ['sass:app']);
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
            'connect',
           'connect:html',
           'connect:css',
           'connect:watch',
           'watch:foundation',
           'watch:bootstrap',
           'watch:cola',
           'watch:app'
          ]);

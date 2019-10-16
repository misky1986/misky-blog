var gulp = require('gulp');
var sass = require('gulp-sass');
var hash = require('gulp-hash');
var del = require('del');
var merge = require('merge-stream');
var rename = require('gulp-rename');
 
// Copy BootStrap SCSS(SASS) from node_modules to src/scss/vendors
gulp.task('vendor:scss', function() {    
  var streamBootstrapScss = gulp.src('./node_modules/bootstrap/scss/**/*.scss')
    .pipe(gulp.dest('./src/scss/vendors/bootstrap'));
    
  var fortAwesomeScss = gulp.src('./node_modules/@fortawesome/fontawesome-free/scss/**/*.scss')
    .pipe(gulp.dest('./src/scss/vendors/font-awesome'));
  
    return merge(streamBootstrapScss, fortAwesomeScss);
});

// Copy third party libraries from node_modules into /vendors
gulp.task('vendor:js', function() {
  var bootstrapStream = gulp.src([
    './node_modules/bootstrap/dist/js/*'
  ])
    .pipe(gulp.dest('src/js/vendors/bootstrap'));

  var jqueryStream = gulp.src([      
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js',      
  ])
    .pipe(gulp.dest('src/js/vendors/jquery'));

  var popperStream = gulp.src([      
    './node_modules/popper.js/dist/umd/popper.*'
  ])
    .pipe(gulp.dest('src/js/vendors/popper'));

  var fontAwesomeStream = gulp.src([      
    './node_modules/@fortawesome/fontawesome-free/js/*.js'
  ])
    .pipe(gulp.dest('src/js/vendors/font-awesome'));

  return merge(bootstrapStream, jqueryStream, popperStream);
});

// Copy font-awesome from node_modules into /fonts
gulp.task('vendor:fonts', function() {
  return gulp.src([    
    './node_modules/@fortawesome/fontawesome-free/webfonts/*'    
  ])
    .pipe(gulp.dest('./src/fonts/font-awesome/webfonts'))
});

// Compile and hash SCSS to static assets folder
gulp.task('build:css', function() {
  var srcCss = ['src/scss/**/*.scss']
  var stream = gulp.src(srcCss)
    .pipe(sass({outputStyle : 'expanded'}))    
    .pipe(rename({ suffix: ".min" }))
    .pipe(rename({ dirname: '' }))
    .pipe(hash())
    .pipe(gulp.dest('static/css'))
    //Create a hash map, delete previous hashed file
    .pipe(hash.manifest('hash.json', {
      deleteOld: true,
      sourceDir: __dirname + '/static/css'      
    }))
    //Put the map in the data directory
    .pipe(gulp.dest('data/css'));
    return stream;
});

// Compile javascript to static assets folder
gulp.task('build:js', function() {
  var stream = gulp.src('src/js/**/*')
  .pipe(rename({ dirname: '' }))  
  .pipe(hash())
  .pipe(gulp.dest('static/js'))
  //Create a hash map, delete previous hashed file
  .pipe(hash.manifest('hash.json', {
    deleteOld: true,
    sourceDir: __dirname + '/static/js'
  }))
  //Put the map in the data directory
  .pipe(gulp.dest('data/js'));
    return stream;
});

// Copy font-awesome from node_modules into /fonts
gulp.task('build:webfonts', function() {
  return gulp.src('./src/fonts/font-awesome/webfonts/*')
    .pipe(gulp.dest('./static/webfonts'))
});

// Watch for changes
gulp.task('watch', function() { 
  var foldersToWatch = [
    'src/scss/**/*',
    'src/js/**/*.js',
    'src/images/**/*',
    'src/fonts/**/*'
  ];
  gulp.watch(foldersToWatch, gulp.parallel('build:css', 'build:js', 'build:webfonts'));
});

// Cleaning static assets folder before next compile
gulp.task('clean', function(){
  return del(['./static']);
});

// Still needs to get clean and fonts working
gulp.task('default', gulp.series(gulp.parallel('vendor:scss', 'vendor:js', 'vendor:fonts'), 'watch'));
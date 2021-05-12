const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');      /* Flex- larni o'zi prefeksini qo'yib beradi! */
const csso = require('gulp-csso');                      /* Bir qatar uchun!!! */
const rename = require("gulp-rename");                  /* min qo'shadi ohiriga */
const gcmq = require('gulp-group-css-media-queries');   /* Medialari uchun */
const watch = require('gulp-watch');                    /* Kuzatish uchun */ 
const browserSync = require('browser-sync').create();     /* Live Server */ 
const plumber = require('gulp-plumber');                  /* Santexnik! Xatoliklarni tuzatuvchi!! */
var sourcemaps = require('gulp-sourcemaps');              /* CSS uchun harita */
var less = require('gulp-less');
var sass = require('gulp-sass');
gulp.task('style', style)

function style() {
    return gulp.src('./app/precss/style.less')  
            .pipe(sourcemaps.init())    
            // .pipe(sass().on('error', sass.logError))  / /sass uchun  
            .pipe(less())
            .pipe(plumber())
            .pipe(autoprefixer({
                browsers: ['last 20 versions'],
                cascade: true
            }))
           .pipe(gcmq())
           .pipe(gulp.dest('./app/css'))
           .pipe(csso())
           .pipe(rename({
               suffix: ".min",
            }))
           .pipe(sourcemaps.write('.'))
           .pipe(gulp.dest('./app/css'))
           .pipe(browserSync.stream());
}

gulp.task('watch', function() {
    watch("./app/precss/**/*.less", style);
    watch("./app/index.html", browserSync.reload);
    watch("./app/js/script.js", browserSync.reload);
    watch("./app/img/*.*", browserSync.reload);
})


gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});



gulp.task('default', gulp.parallel('style', 'watch', 'server'))
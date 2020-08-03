import gulp from 'gulp'

import sass from 'gulp-sass'

import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

import htmlmin from 'gulp-htmlmin'

import imagemin from 'gulp-imagemin'
import cacheBust from 'gulp-cache-bust'

gulp.task('sass', () => 
    gulp
    .src('./src/scss/styles.scss')
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./src/css'))
)

gulp.task('styles', () => 
    gulp
    .src('./src/css/styles.css')
    .pipe(postcss([
        autoprefixer(),
        cssnano()
    ]))
    .pipe(gulp.dest('./public/css'))
)

gulp.task('html-min', () =>
    gulp
    .src('./src/index.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
    }))
    .pipe(cacheBust({
        type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'))
)

gulp.task('imagemin', () => 
    gulp
    .src('./src/images/*')
    .pipe(
        imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]})
        ]))
    .pipe(gulp.dest('./public/images'))
    
)

gulp.task('default', () => {
    gulp.watch('./src/*.html', gulp.series('html-min'))
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))
    gulp.watch('./src/css/*.css', gulp.series('styles'))
})
const gulp = require('gulp');
const render = require('gulp-nunjucks-render');
const beautify = require('gulp-beautify')
var filter = require("gulp-filter");

async function buildHtml() {
    return gulp.src('templates/**/*.+(html|njk)')
        .pipe(render({
            path: ['templates']
        }))
        .pipe(beautify.html({ indent_size: 4, preserve_newlines: false }))
        .pipe(gulp.dest('build'))
}

/**
 * TODO:
 * For some reason this is not working!
 * But ideally we are just trying to remove everything except the index.html file
 */
async function cleanup() {
    const filterIndex = filter(file => {
        console.log(file.path.endsWith('index.html'));
        file.path.endsWith('index.html')
    }, { restore: true });
    return gulp.src('build/**')
        .pipe(filterIndex)
        .pipe(gulp.dest('build'))
}


exports.default = gulp.series(buildHtml, cleanup)
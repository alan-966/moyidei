let project_folder = 'dist';
let source_folder = '#src';

let path = {
	build: { // Пути куда gulp будет выгружать уже обработанные файлы
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/img/',
		fonts: project_folder + '/fonts/',
	},
	src: { // Пути откуда gulp будет брать файлы для обработки
		html: [source_folder + '/pages/**/*.html', '!' + source_folder + '/pages/**/_*.html'],
		css: source_folder + '/scss/style.scss',
		js: source_folder + '/js/script.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		fonts: source_folder + '/fonts/*.ttf',
	},
	watch: { // Пути которые нужно постоянно отслеживать для реактивного изменения
		html: source_folder + '/pages/**/*.html',
		css: source_folder + '/scss/**/*.scss',
		js: source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
	},
	clean: './' + project_folder + '/' // Отвечает за удаление перед запуском gulp
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass');

function browserSync(params)
{
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: false,
	})
}

function html()
{
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css()
{
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function watchFiles()
{
	gulp.watch([path.watch.html], html);
}

function clean()
{
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var atImport = require("postcss-import");
var imagemin = require("gulp-imagemin");
var run = require("run-sequence");



gulp.task("clean", function () {
    return del("docs");
});

gulp.task("copy", function () {
    return gulp.src([
        "*.html",
        "img/**",
        "js/**"
    ], {
        base: "."
    })
        .pipe(gulp.dest("docs"));
});

gulp.task("style", function() {
    gulp.src("style.css")
        .pipe(plumber())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(postcss([
            atImport()
        ]))
        .pipe(gulp.dest("docs"))
        .pipe(server.stream());
});

gulp.task("images", function () {
    return gulp.src("img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.jpegtran({progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("img"));
});

// gulp.task("serve", ["style"], function() {
//     server.init({
//         server: ".",
//         notify: false,
//         open: true,
//         cors: true,
//         ui: false
//     });
//
//     gulp.watch("css/**/*.css", ["style"]);
//     gulp.watch("*.html").on("change", server.reload);
// });

gulp.task("serve", function () {
    server.init({
        server: "docs/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("css/**/*.css", ["style"]);
    gulp.watch("*.html", ["html"]);
});

gulp.task("docs", function (done) {
    run(
        "clean",
        "copy",
        "style",
        done
    );
});
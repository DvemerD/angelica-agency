import gulp from "gulp";
import browserSync from "browser-sync";
import gulpSass from "gulp-sass";
import sassCompiler from "sass";
import rename from "gulp-rename";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import babel from "gulp-babel";
import concat from "gulp-concat";
import imagemin from "gulp-imagemin";
import htmlmin from "gulp-htmlmin";

const sass = gulpSass(sassCompiler);

// gulp.task("server", function () {
//   browserSync({
//     server: {
//       baseDir: "src",
//     },
//   });

//   gulp.watch("src/*.html").on("change", browserSync.reload);
// });

// gulp.task("styles", function () {
//   return gulp
//     .src("src/sass/**/*.+(scss|sass)")
//     .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
//     .pipe(rename({ suffix: ".min", prefix: "" }))
//     .pipe(autoprefixer())
//     .pipe(cleanCSS({ compatibility: "ie8" }))
//     .pipe(gulp.dest("src/css"))
//     .pipe(browserSync.stream());
// });

// gulp.task("watch", function () {
//   gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
// });

// gulp.task("scripts", function () {
//   return gulp
//     .src("src/**/*.js")
//     .pipe(
//       babel({
//         presets: ["@babel/env"],
//       })
//     )
//     .pipe(concat("bundle.js"))
//     .pipe(gulp.dest("dist/js"));
// });

// gulp.task("default", gulp.parallel("watch", "server", "styles", "scripts"));

//Static server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      rename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"));
});

gulp.task("scripts", function () {
  return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("mailer", function () {
  return gulp.src("src/mailer/**/*").pipe(gulp.dest("dist/mailer"));
});

gulp.task("images", function () {
  return gulp.src("src/assets/**/*").pipe(imagemin()).pipe(gulp.dest("dist/assets"));
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "scripts",
    "fonts",
    "html",
    "mailer",
    "images"
  )
);

const gulp = require("gulp");
const del = require("del");
const zip = require("gulp-zip");
const fs = require("fs");

const package = JSON.parse(fs.readFileSync("./package.json"));

function clean(cb) {
  del("dist/**", { force: true });
  cb();
}

function build() {
  return gulp
    .src("src/**")
    .pipe(zip(`QCode-${package.version}.zip`))
    .pipe(gulp.dest("dist"));
}
exports.default = gulp.series(clean, build);

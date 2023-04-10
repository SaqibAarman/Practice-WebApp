const path = require("path");
const fs = require("fs");

const logError = (err) => err && console.log(err);

exports.save = (picPath, contents) => {
  const base64Data = contents.replace(/^data:image\/png;base64,/, "");

  fs.writeFile(
    path.join(picPath, `${new Date()}.png`),
    base64Data,
    { encoding: "base64" },
    logError
  );
};

exports.getPicturesDir = (app) => {
  return path.join(app.getPath("pictures"), "photobomb");
};

exports.mkdir = (picPath) => {
  fs.stat(picPath, (err, stats) => {
    if (err && err.code !== "ENOENT") return logError(err);
    else if (err || !stats.isDirectory()) fs.mkdir(picPath, logError);
  });
};

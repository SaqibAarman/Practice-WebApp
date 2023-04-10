const electron = require("electron");
const fs = require("fs");
const path = require("path");

const { desktopCapturer, ipcRenderer: ipc, screen } = electron;

function getMainSource(desktopCapturer, screen, done) {
  const options = {
    types: ["screen"],
    thumbnailSize: screen.getPrimaryDisplay().workAreaSize,
  };

  desktopCapturer.getSources(options, (err, sources) => {
    console.log(sources, "source");
    if (err) return console.log("Cannot Capture Screen :", err);

    const isMainSource = (source) =>
      source.name === "Entire Screen" || source.name === "Screen 1";

    done(sources /* .filter(isMainSource) */);
  });
}

function onCapture(evt, targetDir) {
  
  getMainSource(desktopCapturer, screen, (source) => {
    const png = source[0].thumbnail.toPng();
    const filePath = path.join(targetDir, new Date() + ".png");

    writeScreenShot(png, filePath);
  });
}

function writeScreenShot(png, filePath) {
  fs.writeFile(filePath, png, (err) => {
    if (err) return console.log("Failed To Write ScreenShot:", err);
  });
}

ipc.on("capture", onCapture);

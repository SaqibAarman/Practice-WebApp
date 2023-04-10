const electron = require("electron");

const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

// const fs = require('fs');
const path = require("path");
const dirPath = path.join(__dirname, "/pictures");

// fs.mkdirSync(dirPath);

console.log(dirPath, "[DIR]");

console.log(app.getPath("home"));

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    resizable: false,
    frame: false,
  });

  mainWindow.openDevTools();

  mainWindow.loadURL(`file://${__dirname}/capture.html`);

  mainWindow.on("close", () => {
    mainWindow = null;
  });

  globalShortcut.register("ctrl+c", () => {
    mainWindow.webContents.send("capture", app.setPath("pictures", dirPath));
  });
});

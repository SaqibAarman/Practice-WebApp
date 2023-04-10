const electron = require("electron");
const countDown = require("./countDown");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const window = [];

app.on("ready", () => {
  [1, 2, 3, 4].forEach(() => {
    // To create multiple windows
    let win = new BrowserWindow({
      height: 400,
      width: 400,
    });

    // To load content on the web screen
    win.loadURL(`file://${__dirname}/countDown.html`);

    win.on("closed", () => {
      // This event triggered when App closed
      win = null;
    });

    window.push(win);
  });
});

ipc.on("start-count", () => {
  // This Will Trigger Event Which Present In renderer.js file
  countDown((count) => {
    window.forEach((wind) => {
      wind.webContents.send("countDown", count);
    });
  }); //CountDown Function
  // webContents --> Event Emitter Instances
});

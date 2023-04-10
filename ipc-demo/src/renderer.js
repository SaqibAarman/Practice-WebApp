const electron = require("electron");
const ipc = electron.ipcRenderer;

document.getElementById("start").addEventListener("click", () => {
  ipc.send("start-count"); // To send new event for main.js "start-count" --> this string is used to identify event name
});

ipc.on("countDown", (evt, count) => {
  document.getElementById("count").innerHTML = count;
});

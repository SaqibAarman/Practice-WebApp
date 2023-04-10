const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

app.on("ready", () => {
  new BrowserWindow();
  const name = electron.app.getName();
  const template = [
    {
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          click: (_) => {
            console.log("CLICKED!");
          },
          role:'about'
        },
        {
          type: "separator",
        },
        {
          label: "Quit", // To quit/close the window
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template); // This is the Standard Template of Menu's
  Menu.setApplicationMenu(menu);
});

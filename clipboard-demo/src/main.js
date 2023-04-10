const electron = require("electron");
const path = require("path");

const { app, Tray, Menu, clipboard } = electron;


const STACK_SIZE = 5;

function addToStack(item, stack) {
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack)
}

function checkClipboardForChange (clipboard, onchange) {
    let cache = clipboard.readText(); 
    let latest;
    setInterval(() => {
        latest = clipboard.readText();

        if( latest !== cache) {
            cache = latest

            onchange(cache)
        }
    }, 1000);
}

app.on("ready", () => {
    let stack = [];
  const tray = new Tray(path.join("src", "Icon.png"));

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "<Empty>",
        enabled: false,
      },
    ])
  );

checkClipboardForChange(clipboard, text => {
   stack = addToStack(text, stack)
   console.log(stack,'stack');
})


});

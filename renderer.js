// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { ipcRenderer } = require("electron");
const { BrowserWindow } = require("electron").remote;

window.addEventListener("DOMContentLoaded", () => {
  console.log("aaaaa");
  document.getElementById("btnSend").addEventListener("click", () => {
    ipcRenderer.send("message", "this is a message from render process.");
    let win = new BrowserWindow({ height: 400, width: 400 });
    win.loadURL("https://www.baidu.com");
  });
  ipcRenderer.on("reply", (event, arg) => {
    document.getElementById("main_msg").innerHTML = arg;
  });
});

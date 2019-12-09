const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  require("devtron").install();

  /**
   * message 自定义的事件名称
   * event 事件对象
   * arg 事件参数
   */
  ipcMain.on("message", (event, arg) => {
    console.log(arg);
    // 主进程回复渲染进程信息
    event.reply("reply", "this is a message from main process.");
  });

  const win = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true,

      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  // 自动打开devtron工具
  win.webContents.openDevTools();

  win.on("ready-to-show", () => {
    win.show();
  });

  // const second = new BrowserWindow({
  //   width: 400,
  //   height: 400,
  //   show: false,
  //   parent: win,
  //   webPreferences: {
  //     nodeIntegration: true,
  //     preload: path.join(__dirname, "preload.js"),
  //   },
  // });

  // second.loadFile("child.html");

  // second.on("ready-to-show", () => {
  //   second.show();
  // });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

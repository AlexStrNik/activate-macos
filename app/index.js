const path = require("path");
const { app, BrowserWindow } = require("electron");
const robot = require("robotjs");

const WIDTH = 374;
const HEIGHT = 172;
const UPDATE_INTERVAL = 1000;

const getLuma = (c) => {
  var rgb = parseInt(c, 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >> 8) & 0xff;
  var b = (rgb >> 0) & 0xff;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

app.whenReady().then(() => {
  const { screen } = require("electron");

  app.dock.hide();
  const win = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    transparent: true,
    hasShadow: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setAlwaysOnTop(true, "floating");
  win.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
    skipTransformProcessType: false,
  });
  win.setFullScreenable(false);

  win.setIgnoreMouseEvents(true);

  const winPosition = [
    screen.getPrimaryDisplay().bounds.width - WIDTH,
    screen.getPrimaryDisplay().bounds.height - HEIGHT,
  ];
  win.setPosition(...winPosition);

  setInterval(() => {
    var hex = robot.getPixelColor(...winPosition);
    const onDark = getLuma(hex) < 255 / 2;

    win.webContents.send("background-changed", { onDark });
  }, UPDATE_INTERVAL);

  win.loadFile(path.resolve(__dirname, "./index.html"));
});

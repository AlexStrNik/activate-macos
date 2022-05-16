const path = require("path");
const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
  const { screen } = require("electron");

  app.dock.hide();
  const win = new BrowserWindow({
    width: 340,
    height: 120,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    minimizable: false,
    maximizable: false,
  });
  win.setAlwaysOnTop(true, "floating");
  win.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
    skipTransformProcessType: false,
  });
  win.setFullScreenable(false);

  win.setIgnoreMouseEvents(true);
  win.setPosition(
    screen.getPrimaryDisplay().workAreaSize.width - 340,
    screen.getPrimaryDisplay().workAreaSize.height
  );

  win.loadFile(path.resolve(__dirname, "./index.html"));
});

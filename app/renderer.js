const ipc = require("electron").ipcRenderer;

ipc.on("background-changed", function (evt, message) {
  console.log(message);
  document.body.className = message.onDark ? "onDark" : "onLight";
});

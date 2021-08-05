import electron, { app } from "electron";
import { createView } from "./app/view";
import Store from "./app/store";

// const app = electron.app;
const appName = "Epidemic Sound";
const config = new Store({
  configName: "window-data",
  defaults: { width: 800, height: 600, x: 0, y: 0 },
});

app.on("ready", async () => {
  console.log("Ready..?");
  const window = await createView(appName, config);
  console.log(window.id);
  await window.loadURL("https://www.epidemicsound.com");
  app.setName(appName);
});

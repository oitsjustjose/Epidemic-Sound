import { BrowserWindow, shell } from "electron";
import path from "path";
import Store from "./store";

export const createView = async (appName: string, config: Store) => {
  const w = new BrowserWindow({
    title: appName,
    icon: path.resolve(
      `${path.dirname(require.main!.filename)}/../assets/icons/app.png`
    ),
    ...config.getDimensions,
    show: process.platform !== "darwin" || true,
    // transparent: process.platform === "darwin",
    frame: false,
    // titleBarStyle: "hidden",
    webPreferences: {
      nativeWindowOpen: true,
      preload: `${path.dirname(
        require.main!.filename
      )}/../assets/js/preload.js`,
      nodeIntegration: false,
    },
  });

  /* Prevent non epidemicmusic.com links from opening in our app */
  w.webContents.on("new-window", async (evt, url) => {
    evt.preventDefault();
    if (url.includes("epidemicsound.com")) {
      await w?.loadURL(url);
    } else {
      shell.openExternal(url);
    }
  });

  w.on("move", () => {
    const bds = w?.getBounds();
    if (bds) {
      config.setDimensions(bds);
    }
  });

  w.on("resize", () => {
    const bds = w?.getBounds();
    if (bds) {
      config.setDimensions(bds);
    }
  });

  w.once("ready-to-show", () => {
    w?.show();
    w?.focus();
  });

  return w;
};

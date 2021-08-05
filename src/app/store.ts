import electron from "electron";
import fs from "fs";
import path from "path";
import { StorageOptions, dimension } from "../utils/interface";

export default class Store {
  path: string;
  data: any;

  constructor(opts: StorageOptions) {
    const dataPath = (electron.app || electron.remote.app).getPath("userData");
    this.path = path.join(dataPath, opts.configName + ".json");
    this.data = parseDataFile(this.path, opts.defaults);
  }

  getDimensions() {
    return this.data;
  }

  setDimensions(data: dimension) {
    this.data = data;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

const parseDataFile = (fp: string, defaults: dimension) => {
  try {
    return JSON.parse(fs.readFileSync(fp).toString());
  } catch (ex) {
    return defaults;
  }
};

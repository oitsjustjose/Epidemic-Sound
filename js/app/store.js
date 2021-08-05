"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = __importDefault(require("electron"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Store = /** @class */ (function () {
    function Store(opts) {
        var dataPath = (electron_1.default.app || electron_1.default.remote.app).getPath("userData");
        this.path = path_1.default.join(dataPath, opts.configName + ".json");
        this.data = parseDataFile(this.path, opts.defaults);
    }
    Store.prototype.getDimensions = function () {
        return this.data;
    };
    Store.prototype.setDimensions = function (data) {
        this.data = data;
        fs_1.default.writeFileSync(this.path, JSON.stringify(this.data));
    };
    return Store;
}());
exports.default = Store;
var parseDataFile = function (fp, defaults) {
    try {
        return JSON.parse(fs_1.default.readFileSync(fp).toString());
    }
    catch (ex) {
        return defaults;
    }
};

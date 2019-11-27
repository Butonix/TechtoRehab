"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
class pluginsController {
    constructor() {
        this.initPlugins = () => {
            //Initialize Plugins
            var arr;
            fs.readdir('./dist/plugins', function (err, items) {
                items.map(async (itemo, i) => {
                    var importer = await Promise.resolve().then(() => __importStar(require(`../plugins/${itemo}/init`)));
                    var initalizer = new importer.first();
                    //initalizer.initFirst;
                    //const gata = new getu();
                    //this.init([]);
                });
            });
        };
        this.initPlugins();
    }
}
exports.pluginsController = pluginsController;
//# sourceMappingURL=Plugins.js.map
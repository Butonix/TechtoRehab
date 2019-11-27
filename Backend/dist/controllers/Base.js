"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Plugins_1 = require("./Plugins");
class baseController {
    constructor() {
        /** Base Modules Initializer */
        this.init = () => {
            /** Initialize Plugins Controller */
            const pluginInitializer = new Plugins_1.pluginsController();
        };
        this.init();
    }
}
exports.baseController = baseController;
//# sourceMappingURL=Base.js.map
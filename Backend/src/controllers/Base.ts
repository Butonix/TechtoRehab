import { pluginsController } from './Plugins';

export class baseController {
  constructor() {
    this.init();
  }

  /** Base Modules Initializer */

  private init = () => {
    /** Initialize Plugins Controller */
    const pluginInitializer = new pluginsController();
  };
}

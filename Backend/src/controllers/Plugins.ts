import { baseController } from './Base';
var fs = require('fs');

export class pluginsController {
  constructor() {
    this.initPlugins();
  }

  private initPlugins = () => {
    //Initialize Plugins
    var arr: {};

    fs.readdir('./dist/plugins', function(err, items) {
      items.map(async (itemo, i) => {
        var importer = await import(`../plugins/${itemo}/init`);
        var initalizer = new importer.first();
        //initalizer.initFirst;
        //const gata = new getu();
        //this.init([]);
      });
    });
  };
}

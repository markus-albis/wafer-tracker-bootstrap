/**
* The view for the products section of the master data module.  Will contain either
* the product list or a single product item for editing.
*/
export class WaferStatePage {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './waferstate-list', nav: false, title: '' },
      { route: ':id', moduleId: './waferstate-item', nav: false, title: 'WaferState'},
    ]);
  }
}

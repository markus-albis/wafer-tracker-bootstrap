/**
* The view for the products section of the master data module.  Will contain either
* the product list or a single product item for editing.
*/
export class FabSpecPage {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './fabspec-list', nav: false, title: '' },
      { route: ':id', moduleId: './fabspec-item', nav: false, title: 'FabSpec'},
    ]);
  }
}

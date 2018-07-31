/**
* The view for the products section of the master data module.  Will contain either
* the product list or a single product item for editing.
*/
export class ProductPage {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './product-list', nav: false, title: '' },
      { route: ':id', moduleId: './product-item', nav: false, title: 'Product'},
    ]);
  }
}

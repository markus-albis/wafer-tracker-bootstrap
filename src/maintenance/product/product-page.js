/**
* The view for the products section of the maintenance module.  Will contain either
* the product list or a single product item for editing.
*/
export class ProductPage {
  configureRouter(config, router) {
    config.map([
      { route: '',   name: "ProductNames",  moduleId: './product-list', nav: false, title: 'ProductNames' },
      { route: ':id', name: "ProductNameId", moduleId: './product-item', nav: false, title: 'ProductName' },
    ]);
  }
}

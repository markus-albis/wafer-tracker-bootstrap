/**
* The view for the products section of the master data module.  Will contain either
* the product list or a single product item for editing.
*/
export class FailureCategoryPage {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './failurecategory-list', nav: false, title: '' },
      { route: ':id', moduleId: './failurecategory-item', nav: false, title: 'FailureCategory'},
    ]);
  }
}

/**
* The view for the products section of the maintenance module.  Will contain either
* the product list or a single product item for editing.
*/
export class MaskPage {
  configureRouter(config, router) {
    config.map([
      { route: '',   name: "Masks",  moduleId: './mask-list', nav: false, title: 'Masks' },
      { route: ':id', name: "MaskId", moduleId: './mask-item', nav: false, title: 'Mask' },
    ]);
  }
}

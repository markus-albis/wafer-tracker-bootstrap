/**
* The view for the fab spec section of the editors module.  Will contain either
* the fab spec list or a single fab spec for editing.
*/
export class FabSpecPage {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './fabspec-list', nav: false, title: '' },
      { route: ':id', moduleId: './fabspec-item', nav: false, title: 'FabSpec'},
    ]);
  }
}

/**
* The view for the process section of the editors module.  Will contain either
* the process list or a single process item for editing.
*/
export class ProcessPage {
  configureRouter(config, router) {
    config.map([
      { route: '',    moduleId: './process-list', nav: false, title: '' },
      { route: ':id', moduleId: './process-item', nav: false, title: 'Process'},
    ]);
  }
}

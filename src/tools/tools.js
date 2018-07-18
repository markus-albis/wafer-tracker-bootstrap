export class Tools {

  configureRouter(config,router){
    config.title='Tools';
    config.map([
      {route: ['','migrate_data'], name: 'migrate_data', moduleId: './migrate_data/migrate_data', nav: true, title: 'Migrate Data'},
      {route: ['label_print'], name: 'label_print', moduleId: './label_print/label_print', nav: true, title: 'Print Label'}
    ])

    this.router=router;
  }

}

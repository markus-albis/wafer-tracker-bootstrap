export class Tracker{

  configureRouter(config,router){
    config.title='Wafer Tracker';
    config.map([
      {route: ['','track'], name:'track', moduleId: './track/track', nav: true, title: 'Track'},
      {route: 'hold', name:'hold', moduleId: './hold/hold', nav: true, title: 'Hold'},
      {route: 'trash', name:'trash', moduleId: './trash/trash', nav: true, title: 'Trash'},
      {route: 'start', name:'start', moduleId: './start/start', nav: true, title: 'Wafer Start'},
      {route: 'add', name:'add', moduleId: './add/add', nav: true, title: 'Add Epi'},
      {route: 'addlot', name:'addlot', moduleId: './addlot/addlot', nav: true, title: 'Add Lot'},
      {route: 'print', name:'print', moduleId: './print/print', nav: true, title: 'Print Barcode Labels'}
    ])

    this.router=router;
  }

}

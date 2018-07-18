export class Maintenance {

  configureRouter(config,router){
    config.title='Data Maintenance';
    config.map([
      {route: ['','productnames'], name: 'productnames', moduleId: './product/product-page', nav: true, title: 'Products'},
      {route: ['masks'], name: 'masks', moduleId: './mask/mask-page', nav: true, title: 'Masks'},
      {route: ['epitypes'], name: 'epitypes', moduleId: './epi-type/epitype-page', nav: true, title: 'Epi Types'},
      {route: ['episuppliers'], name: 'episuppliers', moduleId: './episupplier/episupplier-page', nav: true, title: 'Epi Suppliers'},
      {route: ['wafersuppliers'], name: 'wafersuppliers', moduleId: './wafersupplier/wafersupplier-page', nav: true, title: 'Wafer Suppliers'},
      {route: ['technicians'], name: 'technicians', moduleId: './technician/technician-page', nav: true, title: 'Technicians'}
    ])

    this.router=router;
  }

}

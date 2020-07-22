export class MasterData {

  configureRouter(config,router){
    config.title='Master Data';
    config.map([
      {route: ['','products'], name: 'products', moduleId: './product/product_page', nav: true, title: 'Products'},
      {route: 'epitypes', name: 'epitypes', moduleId: './epi-type/epitype_page', nav: true, title: 'Epi Types'},
      {route: 'episuppliers', name: 'episuppliers', moduleId: './episupplier/episupplier_page', nav: true, title: 'Epi Suppliers'},
      {route: 'wafersuppliers', name: 'wafersuppliers', moduleId: './wafersupplier/wafersupplier_page', nav: true, title: 'Wafer Suppliers'},
      {route: 'masks', name: 'masks', moduleId: './mask/mask-page', nav: true, title: 'Masks'},
      {route: 'wafersuppliers', name: 'wafersuppliers', moduleId: './wafersupplier/wafersupplier_page', nav: true, title: 'Wafer Suppliers'},
      {route: 'technicians', name: 'technicians', moduleId: './technician/technician_page', nav: true, title: 'Technicians'},
      {route: 'waferstates', name: 'waferstates', moduleId: './waferstate/waferstate_page', nav: true, title: 'Wafer States'},
      {route: 'failurecategories', name: 'failurecategories', moduleId: './failurecategory/failurecategory_page', nav: true, title: 'Failure Categories'}
    ])
    this.router=router;
  }
  
}

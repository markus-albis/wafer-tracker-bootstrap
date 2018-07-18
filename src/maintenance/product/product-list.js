import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class Products extends ListViewModel{

  heading = 'Products';
  entities=[]

  constructor(router,dataservice) {
    super('productnames', router, dataservice)
    this.dataservice = dataservice;
  }

  activate(){
    this.getProducts();
  }

  // attached(){
  //   $(this.producttable).dataTable();
  // }

  getProducts() {
    this.isLoading = true;
    this.dataservice.getProducts()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
      .then(() => {
        $(this.producttable).dataTable({
          info: true,
          lengthChange: false,
          searching: true
        });
        });
  }
}

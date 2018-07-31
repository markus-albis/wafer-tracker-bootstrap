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
  pageSize = 15;

  filters = [
      {value: '', keys: ['ProductName', 'ProductCode']}
  ];


  constructor(router,dataService) {
    super('products', router, dataService)
    this.dataService = dataService;
  }

  activate(){
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.dataService.getProducts()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
  }
}

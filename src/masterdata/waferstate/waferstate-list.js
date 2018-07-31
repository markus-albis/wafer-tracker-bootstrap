import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class WaferStates extends ListViewModel{

  heading = 'Wafer States';
  entities=[]
  pageSize = 15;

  // filters = [
  //     {value: '', keys: ['ProductName', 'ProductCode']}
  // ];


  constructor(router,dataService) {
    super('waferstates', router, dataService)
    this.dataService = dataService;
  }

  activate(){
    this.getWaferStates();
  }

  getWaferStates() {
    this.isLoading = true;
    this.dataService.getWaferStates()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
  }
}

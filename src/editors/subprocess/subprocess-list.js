import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class SubProcessList extends ListViewModel{

  heading = 'Sub Process List';
  entities=[]
  pageSize = 20;

  // filters = [
  //     {value: '', keys: ['ProductName', 'ProductCode']}
  // ];


  constructor(router,dataService) {
    super('subprocess', router, dataService)
    this.dataService = dataService;
  }

  activate(){
    this.getSubProcesses();
  }

  getSubProcesses() {
    this.isLoading = true;
    this.dataService.getSubProcesses()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
  }
}

import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class ProcessList extends ListViewModel{

  heading = 'Processes';
  entities=[]
  pageSize = 20;

  // filters = [
  //     {value: '', keys: ['ProductName', 'ProductCode']}
  // ];


  constructor(router,dataService) {
    super('process', router, dataService)
    this.dataService = dataService;
  }

  activate(){
    this.getProcesses();
  }

  getProcesses() {
    this.isLoading = true;
    this.dataService.getProcesses()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
  }
}

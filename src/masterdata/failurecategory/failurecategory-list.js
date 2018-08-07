import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class FailureCategories extends ListViewModel{

  heading = 'Failure Categories';
  entities=[]
  pageSize = 10;

  // filters = [
  //     {value: '', keys: ['ProductName', 'ProductCode']}
  // ];


  constructor(router,dataService) {
    super('failurecategories', router, dataService)
    this.dataService = dataService;
  }

  activate(){
    this.getFailureCategories();
  }

  getFailureCategories() {
    this.isLoading = true;
    this.dataService.getFailureCategories()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
  }
}

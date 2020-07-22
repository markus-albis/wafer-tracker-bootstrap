import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class FabSpecList extends ListViewModel{

  heading = 'Fab Specs';
  entities=[]
  pageSize = 10;

  // filters = [
  //     {value: '', keys: ['ProductName', 'ProductCode']}
  // ];


  constructor(router,dataService) {
    super('fabspec', router, dataService)
    this.dataService = dataService;
  }

  activate(){
    this.getFabSpecs();
  }

  getFabSpecs() {
    this.isLoading = true;
    this.dataService.getFabSpecs()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
  }
}

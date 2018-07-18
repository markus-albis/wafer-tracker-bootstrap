import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class Masks extends ListViewModel{

  heading = 'Masks';
  entities=[]

  constructor(router,dataservice) {
    super('masks', router, dataservice)
    this.dataservice = dataservice;
  }

  activate(){
    this.getMasks();
  }

  // attached(){
  //   $(this.producttable).dataTable();
  // }

  getMasks() {
    this.isLoading = true;
    this.dataservice.getMasks()
      .then(result => {
        this.entities = result.results;
        this.isLoading = false;})
      .then(() => {
        $(this.masktable).dataTable({
          info: true,
          lengthChange: false,
          searching: true
        });
        });
  }
}

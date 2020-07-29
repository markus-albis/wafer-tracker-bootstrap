import {ListViewModel} from '../list-viewmodel';
import {DataService}  from 'services/dataservice';
import {inject} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import {logger} from 'services/log';
import $ from 'jquery';
import {dataTable} from 'datatables';

@inject(AppRouter,DataService)
export class FabSpecList extends ListViewModel{

  heading = 'Fab Specs';
  entities=[];
  pageSize = 10;

  // filters = [
  //     {value: '', keys: ['ProductName', 'ProductCode']}
  // ];


  constructor(router,dataService) {
    super('fabspec', router, dataService)
    this.dataService = dataService;
  }

  activate() {
      this.loadData();
  }

  loadData() {
    let op1 = Promise.resolve(this.getFabSpecs());
    let op2 = Promise.resolve(this.getFabSpecHistories());
    let op3 = Promise.resolve(this.getFabSpecStates());
    let op4 = Promise.resolve(this.getProducts());
    let op5 = Promise.resolve(this.getProductOwners());
    Promise.all([op1, op2, op3, op4, op5])
        .then(results =>  {
          console.log(results);
          logger.info("Number of fab specs returned from database = " + results[0].length);
          logger.info("Number of fabspec histories returned from database = " + results[1].length);
          logger.info("Number of fabspec states returned from database = " + results[2].length);
          logger.info("Number of products returned from database = " + results[3].length);
          logger.info("Number of product owners returned from database = " + results[4].length);
          this.entities = results[0];
        });
  }

  // Utility Functions

  getFabSpecs() {
    return this.dataService.getFabSpecs()
    .then(result => {return result.results;});
  }

  getFabSpecHistories() {
    return this.dataService.getFabSpecHistories()
    .then(result => {return result.results;});
  }

  getFabSpecStates() {
    return this.dataService.getFabSpecStates()
    .then(result => {return result.results;});
  }

  getProducts() {
    return this.dataService.getProducts()
    .then(result => {return result.results;});
  }

  getProductOwners() {
    return this.dataService.getProductOwners()
    .then(result => {return result.results;});
  }





}

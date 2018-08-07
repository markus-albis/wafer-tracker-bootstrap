import {inject} from 'aurelia-dependency-injection';
import {_} from 'underscore';
import {DataService} from 'services/dataservice';
import {logger} from 'services/log';


@inject(DataService)
export class Home {


  constructor(dataService){
    this.dataService = dataService;
  }


  activate() {

    //Get data
    let op1 = Promise.resolve(this.getLots());
    let op2 = Promise.resolve(this.getProducts());
    let op3 = Promise.resolve(this.getWaferLocations());
    let op4 = Promise.resolve(this.getFailureCategories());
    let op5 = Promise.resolve(this.getWaferStates());
    let op6 = Promise.resolve(this.getWafers());
    let op7 = Promise.resolve(this.getWaferHistories());
    Promise.all([op1,op2, op3, op4, op5, op6, op7])
        .then(result =>  {
          logger.info("Number of lots returned from database = " + result[0].length);
          logger.info("Number of products returned from database = " + result[1].length);
          logger.info("Number of wafer locations returned from database = " + result[2].length);
          logger.info("Number of failure categories returned from database = " + result[3].length);
          logger.info("Number of wafer states returned from database = " + result[4].length);
          logger.info("Number of wafers returned from database = " + result[5].length);
          logger.info("Number of wafer histories returned from database = " + result[6].length);
        })
  }

  // Utility functions

  getFailureCategories(){
    return this.dataService.getFailureCategories()
    .then(result => {return result.results;});
  }

  getLots(){
    return this.dataService.getLots()
    .then(result => {return result.results;});
  }

  getProducts(){
    return this.dataService.getProducts()
    .then(result => {return result.results;});
  }

  getWafers(){
    return this.dataService.getWafers()
    .then(result => {return result.results;});
  }

  getWaferLocations(){
    return this.dataService.getWaferLocations()
    .then(result => {return result.results;});
  }

  getWaferHistories(){
    return this.dataService.getWaferHistories()
    .then(result => {return result.results;});
  }

  getWaferStates(){
    return this.dataService.getWaferStates()
    .then(result => {return result.results;});
  }

}

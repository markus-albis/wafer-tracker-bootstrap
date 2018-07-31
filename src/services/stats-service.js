import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
import moment from 'moment';
import {DataService} from 'services/dataservice';
import {logger} from 'services/log';
import {WaferHistory} from 'models/waferhistory'

@inject(DataService)
export class StatsService {

  waferHistoryCrossfilter = null;
  waferLocationDimension = null;
  startDateDimension = null;
  waferStateDimension = null;

  constructor(dataService) {
    this.dataService = dataService;
    this.loadData();
  }

  // Bulk data load
  loadData(){
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
          this.waferHistories = this.mapWaferHistories(result[6]);
          this.initService();
        });
  }

  // Define some common crossfilters and dimensions
  initService() {
    this.whcx = crossfilter(this.waferHistories);
    this.waferHistoryCrossfilter = this.whcx;                                    // Create a crossfilter for wafer histories
    this.waferLocationDimension = this.whcx.dimension(function(s) { return s.WaferLocation})            // Define a dimension for wafer locations
    this.startDateDimension = this.whcx.dimension(function(s) { return s.StartDate;})                   // Define a dimension for wafer start dates
    this.waferStateDimension = this.whcx.dimension(function(ws) {return ws.WaferState});                // Define a dimension for wafer states
  };


  filterWaferStarts(fromDate, toDate) {
    let filteredLocations = this.waferLocationDimension.filterExact("OSZR-FEOL  / Part 1");   // Apply filter to WaferLocations dimension
    let filteredStarts = this.startDateDimension.filterRange([fromDate, toDate]);            // Apply filter to StartDate dimension
    let waferStarts = this.startDateDimension.top(Infinity).length;
  }

  filterWaferHistoriesByLocationAndPeriod(location, fromDate, toDate) {
    let filteredLocations = this.waferLocationDimension.filterExact(location);                // Apply filter to WaferLocations dimension
    let filteredStarts = this.startDateDimension.filterRange([fromDate, toDate]);             // Apply filter to StartDate dimension
  }

  resetFilters() {
    this.waferLocationDimension.filterAll();
    this.startDateDimension.filterAll();
    this.waferStateDimension.filterAll();
  }


  getWaferYield() {

    // Get Wafer Starts
    let waferStarts = this.startDateDimension.top(Infinity).length;
    // Get WIP
    let filteredWaferStates = this.waferStateDimension.filterExact("WIP");
    let wip = this.waferStateDimension.top(Infinity).length;
    // Get On-hold wafers
    this.waferStateDimension.filterAll();
    filteredWaferStates = this.waferStateDimension.filterExact("On-Hold");
    let onHold = this.waferStateDimension.top(Infinity).length;
    // Get passed wafers
    this.waferStateDimension.filterAll();
    filteredWaferStates = this.waferStateDimension.filterExact("Passed");
    let passed = this.waferStateDimension.top(Infinity).length;

    // logger.info("WaferStarts/Passed/WIP/OnHold/", waferStarts, passed,wip,onHold)
    // Calculate yield for last twelve month
    return  Math.round(100 * passed / (waferStarts - wip- onHold));

  }

  // Utility functions

  // Create flat wafer history model
  mapWaferHistories(results) {
    let whs = [];
    for (let r of results) {
      let wh = new WaferHistory();
      wh.StartDate=r.StartDate;
      wh.StopDate=r.StopDate;

      if (r.WaferLocation != null) {
        wh.WaferLocation = r.WaferLocation.LocationName
      } else {
        wh.WaferLocation = "Undefined"
      }

      if (r.Wafer != null) {
        wh.Wafer= r.Wafer.WaferIdentification;
        if (r.Wafer.Lot != null) {
          wh.Lot = r.Wafer.Lot.LotNumber;
        } else {
          wh.Lot = "Undefined"
        }
        if (r.Wafer.WaferState != null) {
          wh.WaferState = r.Wafer.WaferState.Description;
        } else {
          wh.WaferState = "Undefined"
        }
        if (r.Wafer.FailureCategory != null) {
          wh.FailureCategory = r.Wafer.FailureCategory.Description;
        } else {
          wh.FailureCategory = "Undefined"
        }
      } else {
        wh.Wafer = "Undefined"
      }

      whs.push(wh);
    }
    return whs;
  }

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

  print_filter(filter) {
    var f = eval(filter);
    if (typeof(f.length) != "undefined") {} else {}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);} else {}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);} else {}
    logger.info(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  }

}

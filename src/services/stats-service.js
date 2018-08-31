import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
import moment from 'moment';
import {_} from 'underscore';
import {DataService} from 'services/dataservice';
import {logger} from 'services/log';
import {WaferHistory} from 'models/waferhistory'

@inject(DataService)
export class StatsService {

  // Crossfilters
  whcx = null;      // Wafer history crossfilter
  tfcx = null;      // Time filtered wafer history crossfilter

  // Crossfilter dimensions
  whcxWaferLocationDimension = null;  // Crossfilter dimension on all wafer locations
  whcxStartDateDimension = null;      // Crossfilter dimension on all start dates
  whcxWaferStateDimension = null;     // Crossfilter dimension on all wafer states

  tfcxStartMonthDimension = null;       // Time filtered crossfilter dimension on all start dates rounded to first of month for month grouping (see d3-time)
  tfcxWaferLocationDimension = null;    // Time filtered crossfilter dimension on all wafer locations
  tfcxWaferStateDimension = null;       // Time filtered crossfilter dimension on all wafer getWaferStates
  tfcxFailureCategoryDimension = null;  // Time filtered crossfilter dimension on all wafer failure categories
  tfcxProductDimension = null;          // Time filtered crossfilter dimension on all wafer products

  // Some global parmeters
  totalWaferStarts = 0;   // Total number of wafer starts
  totalWIP = 0;           // Current total of work-in-progress wafers
  totalOnHold = 0;        // Current total of on-hold wafers
  ltmWaferStarts = 0;     // Wafer starts of last twelve month
  ltmWIP = 0;             // Work in progress wafers started in the last tweleve month
  ltmOnHold = 0;          // On-hold wafres started in the last twelve month
  ltmPassed = 0;          // Passed wafers started in the last twelve month
  ltmFailed = 0;          // Passed wafers started in the last twelve month
  cYWaferStarts = 0;      // Wafer starts of current calendar year
  ltmWaferYield = 0;      // Wafer yield of past twelve month

  hasData = false

  constructor(dataService) {
    this.dataService = dataService;
    // this.loadData();
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
    return Promise.all([op1,op2, op3, op4, op5, op6, op7])
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
          this.extractGlobals();
          this.hasData = true;
        });
  }

  // Define some common crossfilters and dimensions
  initService() {
    this.whcx = crossfilter(this.waferHistories);                                                           // Create a crossfilter for wafer histories
    this.whcxWaferLocationDimension = this.whcx.dimension(function(s) { return s.WaferLocation})            // Define a dimension for wafer locations
    this.whcxStartDateDimension = this.whcx.dimension(function(s) { return s.StartDate;})                   // Define a dimension for wafer start dates
    this.whcxWaferStateDimension = this.whcx.dimension(function(ws) {return ws.WaferState});                // Define a dimension for wafer states
  }

  extractGlobals() {
    // Get total wafer starts
    let filteredLocations = this.whcxWaferLocationDimension.filterExact("OSZR-FEOL  / Part 1");   // Apply filter to WaferLocations dimension
    this.totalWaferStarts = filteredLocations.top(Infinity).length;
    // Get wafer starts of current year
    let filteredStarts = this.whcxStartDateDimension.filterRange([moment().startOf('year'), moment()]);
    this.cYWaferStarts = filteredStarts.top(Infinity).length;
    // Get wafer starts of last 12 months
    this.whcxStartDateDimension.filterAll()
    filteredStarts = this.whcxStartDateDimension.filterRange([moment().startOf("months").subtract(1, 'year'), moment().startOf("months")]);
    this.ltmWaferStarts = filteredStarts.top(Infinity).length;
    // // Get total WIP
    this.whcxStartDateDimension.filterAll()
    let filteredWaferStates = this.whcxWaferStateDimension.filterExact("WIP");
    this.totalWIP = filteredWaferStates.top(Infinity).length;
    // Get total On-hold wafers
    this.whcxWaferStateDimension.filterAll()
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("On-Hold");
    this.totalOnHold = filteredWaferStates.top(Infinity).length;
    // Get some paramaters for last twelve month
    this.whcxStartDateDimension.filterAll()
    this.whcxWaferStateDimension.filterAll()
    filteredStarts = this.whcxStartDateDimension.filterRange([moment().startOf("months").subtract(1, 'year'), moment().startOf("months")]);
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("WIP");
    this.ltmWIP = filteredWaferStates.top(Infinity).length;
    this.whcxWaferStateDimension.filterAll()
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("On-Hold");
    this.ltmOnHold = filteredWaferStates.top(Infinity).length;
    this.whcxWaferStateDimension.filterAll()
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("Passed");
    this.ltmPassed = filteredWaferStates.top(Infinity).length;
    this.whcxWaferStateDimension.filterAll()
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("Failed");
    this.ltmFailed = filteredWaferStates.top(Infinity).length;
    // Calculate yield for last twelve month
    this.ltmWaferYield = Math.round(100*this.ltmPassed / (this.ltmWaferStarts - this.ltmWIP - this.ltmOnHold));
  }

  filterWaferStarts(fromDate, toDate) {
    let filteredLocations = this.whcxWaferLocationDimension.filterExact("OSZR-FEOL  / Part 1");   // Apply filter to WaferLocations dimension
    let filteredStarts = this.whcxStartDateDimension.filterRange([fromDate, toDate]);            // Apply filter to StartDate dimension
    let waferStarts = this.whcxStartDateDimension.top(Infinity).length;
  }

  resetFilters() {
    this.whcxWaferLocationDimension.filterAll();
    this.whcxStartDateDimension.filterAll();
    this.whcxWaferStateDimension.filterAll();
  }

  filterStartLocation() {
    let filteredLocations = this.tfcxWaferLocationDimension.filterExact("OSZR-FEOL  / Part 1");   // Apply filter to WaferLocations dimension
  }

  filterWaferHistories(fromDate, toDate) {
    this.timeFilteredWaferHistories = _.filter(this.waferHistories, function(w) {return (w.StartDate >= fromDate && w.StartDate < toDate)});
    this.tfcx = crossfilter(this.timeFilteredWaferHistories);
    this.tfcxWaferLocationDimension = this.tfcx.dimension(function(s) {return s.WaferLocation});            // Define a dimension for wafer locations
    this.tfcxStartMonthDimension = this.tfcx.dimension(function(s) {return dc.d3.timeMonth(s.StartDate)});  // Define a dimension for wafer start month
    this.tfcxFailureCategoryDimension = this.tfcx.dimension(function(s) {return s.FailureCategory});        // Define a dimension for failure category
    this.tfcxWaferStateDimension = this.tfcx.dimension(function(s) {return s.WaferState});                  // Define a dimension for failure category
    this.tfcxProductDimension = this.tfcx.dimension(function(s) {return s.Product});                        // Define a dimension for product
  }

  resetWaferHistories() {
    this.tfcxWaferLocationDimension.filterAll();
    this.tfcxStartMonthDimension.filterAll();
    this.tfcxWaferStateDimension.filterAll();
  }

  // Wafer yield calculation used by clients for the calculation of trailing wafer yield values
  getWaferYield() {
    // Get Wafer Starts
    let waferStarts = this.whcxStartDateDimension.top(Infinity).length;
    // Get WIP
    let filteredWaferStates = this.whcxWaferStateDimension.filterExact("WIP");
    let wip = filteredWaferStates.top(Infinity).length;
    // Get On-hold wafers
    this.whcxWaferStateDimension.filterAll();
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("On-Hold");
    let onHold = filteredWaferStates.top(Infinity).length;
    // Get passed wafers
    this.whcxWaferStateDimension.filterAll();
    filteredWaferStates = this.whcxWaferStateDimension.filterExact("Passed");
    let passed = filteredWaferStates.top(Infinity).length;

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
        if (r.Wafer.Product != null) {
          wh.Product = r.Wafer.Product.ShortName;
        } else {
          wh.Product = "Undefined"
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

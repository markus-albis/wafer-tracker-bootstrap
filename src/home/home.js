import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
// import * as d3 from 'd3';
import moment from 'moment';
import {DataService} from 'services/dataservice';
import {logger} from 'services/log';
import {WaferHistory} from './models/waferhistory'

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

        this.WaferHistories = this.mapWaferHistories(result[6]);
        this.initializeCrossFilter();
      })
}

initializeCrossFilter() {

  this.whcx = crossfilter(this.WaferHistories);
  let locations = this.whcx.dimension(function(s) { return s.WaferLocation})
  let filteredLocations = locations.filterExact("OSZR-FEOL  / Part 1")

  // Get total wafer starts
  this.totalWaferStarts = filteredLocations.top(Infinity).length;
  logger.info("Total WaferStarts: ", this.totalWaferStarts);

  let starts = this.whcx.dimension(function(s) { return s.StartDate;})

  // Get wafer starts of current year
  let filteredStarts = starts.filterRange([new Date("2018-01-01"), new Date()]);
  this.yearToDayWaferStarts = filteredStarts.top(Infinity).length;
  logger.info("Wafer Starts YTD: ", this.yearToDayWaferStarts);

  // Get wafer starts of past 12 months
  filteredStarts = starts.filterRange([moment().subtract(1, 'year'), moment()]);
  this.trailingTwelveMonthsWaferStarts = filteredStarts.top(Infinity).length;
  logger.info("Wafer Starts TTM: ", this.trailingTwelveMonthsWaferStarts);

  // Group wafer starts by months
  starts.filterAll()
  this.startMonths = this.whcx.dimension(function(s) { return dc.d3.timeMonth(s.StartDate)});
  this.waferStartsByMonth = this.startMonths.group();
  this.print_filter("this.waferStartsByMonth");
  // let firstMonth = this.startMonths.bottom(1)[0].StartDate;
  // let lastMonth = this.startMonthss.top(1)[0].StartDate;
  // logger.info(firstMonth, lastMonth);
  let waferStartsChart = dc.barChart("#chart_container1")
  waferStartsChart.width(600).height(300)
  .margins({top:10, right:10, bottom:30, left:30})
  .dimension(this.startMonths)
  .group(this.waferStartsByMonth)
  .x(dc.d3.scaleTime())
  .elasticX(true)
  .round(dc.d3.timeMonth.round)
  .alwaysUseRounding(true)
  .xUnits(dc.d3.timeMonths);
  dc.renderAll();

}


// Create flat wafer history models
mapWaferHistories(results) {
  let whs = [];
  for (let r of results) {
    let wh = new WaferHistory();
    wh.StartMonth = moment(r.StartDate).format("YYYY.MM")
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
    } else {
      wh.Wafer = "Undefined"
    }
    whs.push(wh);
  }
  return whs;
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

print_filter(filter) {
    var f = eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    logger.info(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    };

}

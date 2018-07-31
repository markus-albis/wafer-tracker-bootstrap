import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
import moment from 'moment';
import {_} from 'underscore';
import {DataService} from 'services/dataservice';
import {StatsService} from 'services/stats-service';
import {logger} from 'services/log';
import {WaferHistory} from './models/waferhistory'


@inject(DataService, StatsService)
export class Home {

  timePeriods = ["All", "Current Year", "Last 12 Months", "Last 24 Months", "Last 36 Months"];
  selectedTimePeriod = "";


  constructor(dataService, statsService){
    this.dataService = dataService;
    this.statsService = statsService;
  }

activate() {

  this.selectedTimePeriod = "Last 12 Months"

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
        this.timeFilteredWaferStarts = this.timeFilterWaferStarts(this.selectedTimePeriod)
        this.initializeDashboard();
      })
}

initializeDashboard() {

  this.whcx = crossfilter(this.waferHistories);
  let locations = this.whcx.dimension(function(s) { return s.WaferLocation})
  let filteredLocations = locations.filterExact("OSZR-FEOL  / Part 1")

  // Get total wafer starts
  this.totalWaferStarts = filteredLocations.top(Infinity).length;
  logger.info("Total WaferStarts: ", this.totalWaferStarts);

  let starts = this.whcx.dimension(function(s) { return s.StartDate;})

  // Get wafer starts of current year
  starts.filterAll()
  let filteredStarts = starts.filterRange([new Date("2018-01-01"), new Date()]);
  this.currentYearWaferStarts = filteredStarts.top(Infinity).length;
  logger.info("Wafer Starts YTD: ", this.currentYearWaferStarts);

  // Get wafer starts of last 12 months
  starts.filterAll()
  filteredStarts = starts.filterRange([moment().subtract(1, 'year'), moment()]);
  this.ltmWaferStarts = filteredStarts.top(Infinity).length;
  logger.info("Wafer Starts TTM: ", this.ltmWaferStarts);

  // Group wafers by state
  let states = this.whcx.dimension(function(ws) {return ws.WaferState});

  // Get WIP of last twelve month
  let filteredWaferStates = states.filterExact("WIP");
  let ltmWIP = filteredWaferStates.top(Infinity).length;
  // Get On-hold wafers of last tweleve month
  states.filterAll()
  filteredWaferStates = states.filterExact("On-Hold");
  let ltmOnHold = filteredWaferStates.top(Infinity).length;
  // Get passed wafers of last twelve
  states.filterAll()
  filteredWaferStates = states.filterExact("Passed");
  let ltmPassedWafers = filteredWaferStates.top(Infinity).length;

  // Calculate yield for last twelve month
  this.ltmWaferYield = Math.round(100*ltmPassedWafers / (this.ltmWaferStarts - ltmWIP - ltmOnHold));

  // Get total WIP
  starts.filterAll()
  states.filterAll()
  filteredWaferStates = states.filterExact("WIP");
  this.totalWIP = filteredWaferStates.top(Infinity).length;
  // Get total On-hold wafers
  states.filterAll()
  filteredWaferStates = states.filterExact("On-Hold");
  this.OnHold = filteredWaferStates.top(Infinity).length;

  // Create a crossfilter from the time filtered wafer starts
  let wscx = crossfilter(this.timeFilteredWaferStarts);

  // Group wafer starts by start months
  let startMonths = wscx.dimension(function(s) {return dc.d3.timeMonth(s.StartDate)})
  let waferStartsByMonth = startMonths.group();

  // Initialize dc.js
  dc.config.defaultColors(dc.d3.schemeBlues[4]);

  // Initialize Wafer Start Chart
  this.waferStartsChart = dc.barChart("#chart_container1")
  this.waferStartsChart.width(400).height(300)
  .margins({top:10, right:10, bottom:70, left:40})
  .dimension(startMonths)
  .group(waferStartsByMonth)
  .x(dc.d3.scaleTime())
  .ordinalColors(["#283593"])
  .elasticX(true)
  .round(dc.d3.timeMonth.round)
  .alwaysUseRounding(true)
  .xUnits(dc.d3.timeMonths)
  .yAxisLabel("Wafers per Months")
  .gap(3)
  .renderlet(function(chart)
    {chart
    .selectAll("g.x text")
    .attr("transform", "translate(-20,30) rotate(-65)")});

  this.waferStartsChart.render();

  // Group wafers by failure category
  let waferFailures = wscx.dimension(function(w) {return w.FailureCategory});
  let wafersGroupedByFailure = waferFailures.group();
  let filtered_group = this.remove_NoFailures(wafersGroupedByFailure);

  // Initialize Wafer Failure Chart
  this.waferFailuresChart = dc.barChart("#chart_container2")
  this.waferFailuresChart.width(400).height(300)
  .margins({top:10, right:10, bottom:80, left:40})
  .dimension(waferFailures)
  .group(filtered_group)
  .x(dc.d3.scaleBand())
  .ordinalColors(["#283593"])
  .elasticY(true)
  .xUnits(dc.units.ordinal)
  .yAxisLabel("Failure Count")
  .ordering(function(d) {return -d.value})
  .renderlet(function(chart)
    {chart
    .selectAll("g.x text")
    .attr("transform", "translate(-20,40) rotate(-65)")});

  this.waferFailuresChart.render();

  // Calculate summary values
  this.sWaferStart = startMonths.top(Infinity).length;

  // Group wafers by state
  let tFStates = wscx.dimension(function(w) {return w.WaferState});
  // Get WIP
  let tFWaferStates = tFStates.filterExact("WIP");
  this.sWIP = tFWaferStates.top(Infinity).length;
  // Get On-hold
  tFStates.filterAll()
  tFWaferStates = tFStates.filterExact("On-Hold");
  this.sOnHold = tFWaferStates.top(Infinity).length;
  // Get Passed
  tFStates.filterAll()
  tFWaferStates = tFStates.filterExact("Passed");
  this.sPassed = tFWaferStates.top(Infinity).length;
  // Get Failed
  tFStates.filterAll()
  tFWaferStates = tFStates.filterExact("Failed");
  this.sFailed = tFWaferStates.top(Infinity).length;

  // Calculate yield for last twelve month
  this.sYield = Math.round(100*this.sPassed / (this.sWaferStart - this.sWIP - this.sOnHold));

  // Calculate TTM Yield for past 24 months
  // loop over past 24 months
  let data = [];
  for (let i = 24; i > 0; i--) {
    let periodStart = moment().subtract("month", (i + 12));
    let periodEnd = moment().subtract("month", i);
    this.statsService.resetFilters();
    this.statsService.filterWaferStarts(periodStart, periodEnd);
    let periodYield = this.statsService.getWaferYield();
    // logger.info("Period / Yield:", periodEnd.format("YYYY-MM"), periodYield)
    let entry = {Period: periodEnd, yield: periodYield};
    data.push(entry);
  }
  //logger.info(data);
  let ycx = crossfilter(data);
  this.periodDimension = ycx.dimension(function(d) {return d.Period});
  //this.print_filter("this.periodDimension")
  let periodGroup = this.periodDimension.group().reduceSum(function(d) {return d.yield})


  this.waferYieldChart = dc.lineChart("#chart_container0");
  this.waferYieldChart.width(400).height(300)
  .margins({top:10, right:10, bottom:80, left:40})
  .dimension(this.periodDimension)
  .group(periodGroup)
  .x(dc.d3.scaleTime())
  .y(dc.d3.scaleLinear().domain([40, 100]))
  .elasticX(true)
  .round(dc.d3.timeMonth.round)
  .yAxisLabel("TTM wafer Yield")
  .ordinalColors(["#283593"]);
  this.waferYieldChart.render();

}

remove_NoFailures(source_group) {
  return {
    all: function() {
      return source_group.all().filter(function(d) {
        return d.key !== "No Failure"
      });
    }
  }
}

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

timeFilterWaferStarts(period) {
  let tFWS = [];
  let wS = [];
  let today = moment();
  let before = moment();

  // Filter waferHistories for Wafer Starts
  wS = _.filter(this.waferHistories, function(wh) {return wh.WaferLocation == "OSZR-FEOL  / Part 1"})

  switch(period){
    case "All" :
      tFWS = wS;
      break;
    case "Current Year":
      before = moment().startOf("year");
      tFWS = _.filter(wS, function(w) {return (w.StartDate >= before && w.StartDate < today)});
      break;
    case "Last 12 Months":
      before = moment().subtract(12, "month");
      tFWS = _.filter(wS, function(w) {return (w.StartDate >= before && w.StartDate < today)});
      break;
    case "Last 24 Months":
      before = moment().subtract(24, "month");
      tFWS = _.filter(wS, function(w) {return (w.StartDate >= before && w.StartDate < today)});
      break;
    case "Last 36 Months":
      before = moment().subtract(36, "month");
      tFWS = _.filter(wS, function(w) {return (w.StartDate >= before && w.StartDate < today)});
      break;
  }
  // logger.info(tFWS);
  return tFWS
}

timePeriodSelectionChanged() {
  this.timeFilteredWaferStarts = this.timeFilterWaferStarts(this.selectedTimePeriod);

  let wscx = crossfilter(this.timeFilteredWaferStarts);
  let startMonths = wscx.dimension(function(s) {return dc.d3.timeMonth(s.StartDate)})
  let waferStartsByMonth = startMonths.group();
  this.waferStartsChart.dimension(startMonths).group(waferStartsByMonth)
  this.waferStartsChart.render();

  let waferFailures = wscx.dimension(function(w) {return w.FailureCategory});
  let wafersGroupedByFailure = waferFailures.group();
  let filtered_group = this.remove_NoFailures(wafersGroupedByFailure);
  this.waferFailuresChart
    .dimension(waferFailures)
    .group(filtered_group)
    .x(dc.d3.scaleBand())
    .elasticY(true)
    .xUnits(dc.units.ordinal)
    .yAxisLabel("Failure Count")
    .ordering(function(d) {return -d.value});
  this.waferFailuresChart.render();

  // Calculate summary values
  this.sWaferStart = startMonths.top(Infinity).length;

  // Group wafers by state
  let tFStates = wscx.dimension(function(w) {return w.WaferState});
  // Get WIP
  let tFWaferStates = tFStates.filterExact("WIP");
  this.sWIP = tFWaferStates.top(Infinity).length;
  // Get On-hold
  tFStates.filterAll()
  tFWaferStates = tFStates.filterExact("On-Hold");
  this.sOnHold = tFWaferStates.top(Infinity).length;
  // Get Passed
  tFStates.filterAll()
  tFWaferStates = tFStates.filterExact("Passed");
  this.sPassed = tFWaferStates.top(Infinity).length;
  // Get Failed
  tFStates.filterAll()
  tFWaferStates = tFStates.filterExact("Failed");
  this.sFailed = tFWaferStates.top(Infinity).length;

  // Calculate yield for last twelve month
  this.sYield = Math.round(100*this.sPassed / (this.sWaferStart - this.sWIP - this.sOnHold));
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

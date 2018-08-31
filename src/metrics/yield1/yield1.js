import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
import moment from 'moment';
import {_} from 'underscore';
import {StatsService} from 'services/stats-service';
import {logger} from 'services/log';
import {dataTable} from 'datatables';


@inject(StatsService)
export class Yield1 {

  timePeriods = ["All", "Current Year", "Last 12 Months", "Last 24 Months", "Last 36 Months", "Arbitrary"];
  selectedTimePeriod = "";
  fromDate = "";
  toDate = "";

  sWaferStarts = 0;
  sProducts = 0;
  sWIP = 0;
  sOnHold = 0;
  sPassed = 0;
  sfailed = 0;
  sYield = 0;


  constructor(statsService){
    this.statsService = statsService;
  }

  activate() {
    this.selectedTimePeriod = "Last 12 Months";

    logger.info("Activating Yield1.........");
    this.statsService.loadData()
    .then(() => {
      this.initialize();
    })
  }

  initialize() {

    dc.config.defaultColors(dc.d3.schemeBlues[4]);

    // Default time period: last full 12 months
    let periodStart = moment().startOf("months").subtract("month", 12);
    let periodEnd = moment().startOf("months");
    this.fromDate = moment(periodStart).format("MMMM YYYY");
    this.toDate = moment(periodEnd).subtract(2, "weeks").format("MMMM YYYY");
    let minDate = moment(periodStart).subtract(2, "weeks");
    let maxDate = moment(periodEnd).add(2, "weeks");

    this.statsService.filterWaferHistories(periodStart, periodEnd);     // Filter wafer histories to selected time period
    this.statsService.filterStartLocation();                            // Only wafer starts

    let dimension1 = this.statsService.tfcxStartMonthDimension;
    let group1 = this.statsService.tfcxStartMonthDimension.group();
    this.initializeChart1(dimension1, group1, minDate, maxDate);
    this.sWaferStarts = dimension1.top(Infinity).length;
    this.wafers =dimension1.top(Infinity);

    let dimension2 = this.statsService.tfcxProductDimension;
    let group2 = this.statsService.tfcxProductDimension.group();
    let filtered_group2 = this.removeZeroBins(group2);
    this.initializeChart2(dimension2, filtered_group2);
    this.sProducts = _.filter(group2.top(Infinity), function(d) {return d.value > 0}).length

    let dimension3 = this.statsService.tfcxFailureCategoryDimension;
    let group3 = this.statsService.tfcxFailureCategoryDimension.group();
    let filtered_group3 = this.removeNoFailures(group3);
    this.initializeChart3(dimension3, filtered_group3);

    let dimension4 = this.statsService.tfcxWaferStateDimension;
    let filteredWaferStates = dimension4.filterExact("WIP");
    this.sWIP = filteredWaferStates.top(Infinity).length;
    // Get On-hold wafers
    dimension4.filterAll();
    filteredWaferStates = dimension4.filterExact("On-Hold");
    this.sOnHold = filteredWaferStates.top(Infinity).length;
    // Get passed wafers
    dimension4.filterAll();
    filteredWaferStates = dimension4.filterExact("Passed");
    this.sPassed = filteredWaferStates.top(Infinity).length;
    // Get failed wafers
    dimension4.filterAll();
    filteredWaferStates = dimension4.filterExact("Failed");
    this.sFailed = filteredWaferStates.top(Infinity).length;

    this.sYield = Math.round(100 * this.sPassed / (this.sWaferStarts - this.sWIP - this.sOnHold));

  }

  // Chart1 is used for monthly wafer starts
  initializeChart1(dimension1, group1, minDate, maxDate) {
    logger.info("Initializing Chart1")
    // Initialize Wafer Start Chart
    this.chart1 = dc.barChart("#metrics_container1")
    this.chart1.width(400).height(250)
    .margins({top:10, right:10, bottom:70, left:40})
    .dimension(dimension1)
    .group(group1)
    .x(dc.d3.scaleTime().domain([minDate, maxDate]))
    .ordinalColors(["#283593"])
    //.elasticX(true)
    .round(dc.d3.timeMonth.round)
    .alwaysUseRounding(true)
    .xUnits(dc.d3.timeMonths)
    .yAxisLabel("Wafers per Months")
    .gap(1)
    .on("renderlet", function(chart){
      chart.selectAll("g.x text").attr("transform", "translate(-5,30) rotate(-65)")});

     this.chart1.render();
  }

  // Chart2 is used for wafer starts grouped by product
  initializeChart2(dimension2, group2) {
    logger.info("Initializing Chart2")
    // Initialize Wafer Start Chart
    this.chart2 = dc.barChart("#metrics_container2")
    this.chart2.width(400).height(250)
    .margins({top:10, right:10, bottom:70, left:40})
    .dimension(dimension2)
    .group(group2)
    .x(dc.d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .ordinalColors(["#283593"])
    .elasticX(true)
    .yAxisLabel("Product Count")
    .ordering(function(d) {return -d.value})
    .on("renderlet", function(chart){
      chart.selectAll("g.x text").attr("transform", "translate(-20,30) rotate(-65)")});

     this.chart2.render();
  }

  // Chart3 is used for wafer failure categories
  initializeChart3(dimension3, group3) {
    logger.info("Initializing Chart3")
    // Initialize Wafer Start Chart
    this.chart3 = dc.barChart("#metrics_container3")
    this.chart3.width(400).height(250)
    .margins({top:10, right:10, bottom:70, left:40})
    .dimension(dimension3)
    .group(group3)
    .x(dc.d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .ordinalColors(["#283593"])
    .elasticX(true)
    .yAxisLabel("Failure Count")
    .ordering(function(d) {return -d.value})
    .on("renderlet", function(chart){
      chart.selectAll("g.x text").attr("transform", "translate(-20,30) rotate(-65)")});

     this.chart3.render();
  }

  timePeriodSelectionChanged() {

  }


  // Utility functions

  removeZeroBins(source_group) {
    return {
      all: function() {
        return source_group.all().filter(function(d) {
          return d.value > 0
        });
      }
    }
  }

  removeNoFailures(source_group) {
    return {
      all: function() {
        return source_group.all().filter(function(d) {
          return d.key !== "No Failure"
        });
      }
    }
  }


}

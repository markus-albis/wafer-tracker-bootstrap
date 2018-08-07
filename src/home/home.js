import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
import moment from 'moment';
import {_} from 'underscore';
import {StatsService} from 'services/stats-service';
import {logger} from 'services/log';
import {WaferHistory} from './models/waferhistory'


@inject(StatsService)
export class Home {

  timePeriods = ["All", "Current Year", "Last 12 Months", "Last 24 Months", "Last 36 Months"];
  selectedTimePeriod = "";


  constructor(statsService){
    this.statsService = statsService;
  }

  activate() {
    this.selectedTimePeriod = "Last 12 Months"
    this.statsService.loadData()
    .then(() => {
      this.initializeDashboard();
    })
  }

  initializeDashboard() {

    // Get summary values
    this.totalWaferStarts = this.statsService.totalWaferStarts;
    this.currentYearWaferStarts = this.statsService.cYWaferStarts;
    this.ltmWaferStarts = this.statsService.ltmWaferStarts;
    this.ltmWIP = this.statsService.ltmWIP;
    this.ltmOnHold = this.statsService.ltmOnHold;
    this.ltmPassed = this.statsService.ltmPassed;
    this.ltmFailed = this.statsService.ltmFailed;
    this.ltmWaferYield = this.statsService.ltmWaferYield;
    this.totalWIP = this.statsService.totalWIP;
    this.OnHold = this.statsService.totalOnHold;

    // Initialize Monthly Wafer Starts Chart
    let periodStart = moment().subtract("month", 12);
    let periodEnd = moment();
    this.statsService.filterWaferHistories(periodStart, periodEnd);     // Filter wafer histories to selected time period
    this.statsService.filterStartLocation();                            // Only wafer starts
    let dimension1 = this.statsService.tfcxStartMonthDimension;
    let group1 = dimension1.group();
    logger.info(group1.top(Infinity));
    dc.config.defaultColors(dc.d3.schemeBlues[4]);
    this.waferStartsChart = dc.barChart("#chart_container1")
    this.waferStartsChart.width(400).height(300)
    .margins({top:10, right:10, bottom:70, left:40})
    .dimension(dimension1)
    .group(group1)
    .x(dc.d3.scaleTime())
    .ordinalColors(["#283593"])
    .elasticX(true)
    .round(dc.d3.timeMonth.round)
    .alwaysUseRounding(true)
    .xUnits(dc.d3.timeMonths)
    .yAxisLabel("Wafers per Months")
    .gap(3)
    .on("renderlet", function(chart){
      chart.selectAll("g.x text").attr("transform", "translate(-20,30) rotate(-65)")});
    this.waferStartsChart.render();

    // Initialize Wafer Failure Chart
    let waferFailures = this.statsService.tfcxFailureCategoryDimension
    let wafersGroupedByFailure = this.statsService.tfcxFailureCategoryDimension.group();
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
    .on("renderlet", function(chart){
      chart.selectAll("g.x text").attr("transform", "translate(-20,40) rotate(-65)")});

    this.waferFailuresChart.render();

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

}

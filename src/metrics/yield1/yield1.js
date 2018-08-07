import {inject} from 'aurelia-dependency-injection';
import crossfilter from 'crossfilter';
import * as dc from 'dc';
import moment from 'moment';
import {_} from 'underscore';
import {StatsService} from 'services/stats-service';
import {logger} from 'services/log';


@inject(StatsService)
export class Yield1 {

  timePeriods = ["All", "Current Year", "Last 12 Months", "Last 24 Months", "Last 36 Months", "Arbitrary"];
  selectedTimePeriod = "";


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
    // Monthly wafer starts
    let periodStart = moment().subtract("month", 12);
    let periodEnd = moment();
    this.statsService.filterWaferHistories(periodStart, periodEnd);     // Filter wafer histories to selected time period
    this.statsService.filterStartLocation();                            // Only wafer starts
    let dimension1 = this.statsService.tfcxStartMonthDimension;
    let group1 = dimension1.group();

    // logger.info(dimension1.top(Infinity));
    // logger.info(group1.top(Infinity));
    // Initialize dc.js
    dc.config.defaultColors(dc.d3.schemeBlues[4]);

    // Initialize Wafer Start Chart
    this.waferStartsChart = dc.barChart("#metrics_container1")
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
    //logger.info("Rendering Chart1");
  }

  // Chart1 is used for monthly wafer starts
  initializeChart1(dimension1, group1) {
    logger.info("Initializing Chart1")
    // Initialize Wafer Start Chart
    this.chart1 = dc.barChart("#chart_container1")
    this.chart1.width(400).height(300)
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
    .renderlet(function(chart)
      {chart
      .selectAll("g.x text")
      .attr("transform", "translate(-20,30) rotate(-65)")});
  }

  timePeriodSelectionChanged() {

  }


}

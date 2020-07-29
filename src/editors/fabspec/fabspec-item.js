import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';
import {_} from 'underscore';
import $ from 'jquery';
import {ProcessModel} from '../models/process_model';
import {SubProcessModel} from '../models/subprocess_model';
import {logger} from 'services/log';

@inject(AppRouter,DataService)
export class FabSpecItem extends ItemViewModel {

  subProcessModels =  [];
  lastSelectedSubProcessModel = {};
  processSequences=[];
  subProcessSequences = [];
  processModels = [];
  lastSelectedProcessModel = {};
  filteredSubProcessSequence = [];
  textBlocks = [];
  textBlockFabSpecs=[];
  filteredTextBlockFabSpecs = [];
  textBlock = "";
  isEditable = false;

  constructor(router,dataService) {
    super('fabspec',router,dataService);
    this.dataService = dataService;
    this.loadData();
  }

  get title() {
    if (this.entity.FabSpecId <= 0) {
      return 'New Fab Spec';
    }
    return 'Fab Spec Editor';    // ${this.entity.FabSpecDocumentId}
  }

  get item() {
    if (this.entity.FabSpecId <= 0) {
      return 'New Fab Spec';
    }
    return `Fab Spec: ${this.entity.FabSpecDocumentId}`;
  }

  loadData() {
    let op1 = Promise.resolve(this.getProcesses());
    let op2 = Promise.resolve(this.getSubProcesses());
    let op3 = Promise.resolve(this.getProcessSequences());
    let op4 = Promise.resolve(this.getSubProcessSequences());
    let op5 = Promise.resolve(this.getTextBlockFabSpecs());;
    let op6 = Promise.resolve(this.getTextBlocks());
    Promise.all([op1, op2, op3, op4, op5, op6])
        .then(results =>  {
          logger.info("Number of processes returned from database = " + results[0].length);
          logger.info("Number of subprocesses returned from database = " + results[1].length);
          logger.info("Number of process sequences returned from database = " + results[2].length);
          logger.info("Number of subprocess sequences returned from database = " + results[3].length);
          logger.info("Number of textblockfabspecs returned from database = " + results[4].length);
          logger.info("Number of textblocks returned from database = " + results[5].length);
          this.subProcesses = results[1];
          this.processSequences = results[2]; 
          this.subProcessSequences = results[3];
          this.textBlocks = results[5];
          this.textBlockFabSpecs = results[4];
          
          // Select first process 
          this.FilterAndMapProcessSequence();
          let firstProcessModel = _.first(this.processModels);
          firstProcessModel.IsSelected = true;
          this.lastSelectedProcessModel = firstProcessModel;
          
          // Select first sub process and get text block if any (otherwise show default text)
          this.FilterAndMapSubProcessSequence(firstProcessModel.Process.ProcessId);
          let firstSubProcessModel = _.first(this.subProcessModels);
          firstSubProcessModel.IsSelected = true;
          this.lastSelectedSubProcessModel = firstSubProcessModel;
          this.FilterTextBlocks(this.entity.FabSpecId, firstSubProcessModel.SubProcess.SubProcessId);
          console.log("Get custom text block if any");
          this.textBlock =this.getTextBlock(firstSubProcessModel.SubProcess.SubProcessId);              // Get textblock first subprocess if any
          console.log("Custom text block:", this.textBlock);
          if (this.textBlock === "") {                // No text block found => display default text
            this.textBlock = firstSubProcessModel.SubProcess.DefaultText;
            this.isEditable = false;                // Default text is not editable here
            console.log("Default text block;", this.textBlock);
          } 

        });
  }

  selectProcess(pid) {
    this.lastSelectedProcessModel.IsSelected = false;
    let nextProcessModel = _.find(this.processModels, (psm) => psm.Process.ProcessId == pid);
    nextProcessModel.IsSelected = true;
    this.lastSelectedProcessModel = nextProcessModel;
    this.FilterAndMapSubProcessSequence(pid);  // Get subprocess sequence of selected process
    this.FilterTextBlocks(this.entity.FabSpecId, this.subProcessModels[0].SubProcess.SubProcessId);            // Filter TextBlockFabSpec table for available text blocks
    // Select first subprocess and load textblock if any
    this.FilterAndMapSubProcessSequence(nextProcessModel.Process.ProcessId);
    let firstSubProcessModel = _.first(this.subProcessModels);
    this.selectSubProcess(firstSubProcessModel.SubProcess.SubProcessId);
  }

  selectSubProcess(spid) {
    this.lastSelectedSubProcessModel.IsSelected = false;
    let nextSubProcessModel = _.find(this.subProcessModels, (spsm) => spsm.SubProcess.SubProcessId == spid);
    nextSubProcessModel.IsSelected = true;
    this.lastSelectedSubProcessModel = nextSubProcessModel;
    this.textBlock =this.getTextBlock(spid);   // Get textblock of selected subprocess if any
    console.log(this.textBlock);
    if (this.textBlock === "") {                // No text block found => display default text
        this.textBlock = nextSubProcessModel.SubProcess.DefaultText;
        this.isEditable = false;                // Deafult text is not editable here
        console.log(this.textBlock);
    }    
  }


  FilterAndMapProcessSequence() {
      this.processModels = [];
      this.processSequences = _.filter(this.processSequences, (ps) => ps.Product_ProductId == this.entity.Product.ProductId);
      // console.log("Filtered ProcessSequence:", this.processSequences);
      for (let process of this.processSequences) {
          let mpr = new ProcessModel(process.Process, false);
          this.processModels.push(mpr);
      }       
  }

  FilterAndMapSubProcessSequence(pid) {
    this.subProcessModels = [];
    this.filteredSubProcessSequence = _.filter(this.subProcessSequences, (sps) => sps.Process.ProcessId == pid);
    // console.log("Filtered SubProsessSequence:", this.filteredSubProcessSequence);
    for (let subprocess of this.filteredSubProcessSequence) {
      let mspr = new SubProcessModel(subprocess.SubProcess, false);
      this.subProcessModels.push(mspr);
    }
  } 

  FilterTextBlocks(fsid, spsid) {
    this.filteredTextBlockFabSpecs = _.filter(this.textBlockFabSpecs, (tbfs) => tbfs.FabSpec.FabSpecId == fsid && tbfs.SubProcess.SubProcessId == spsid);
    // console.log("Filtered TextBlockFabSpecs:", this.filteredTextBlockFabSpecs);
  }

  getTextBlock(spsid) {
      let text = ""
      let textblockfabspec = _.filter(this.filteredTextBlockFabSpecs, (ftbfs) => ftbfs.SubProcess.SubProcessId == spsid);
      if (textblockfabspec.length !== 0) {
        tbid = textblockfabspec[0].TextBlock.TextBlockId;
        if (tbid !== null ) {
          text = _.filter(this.textBlocks, (tb) => tb.TextBlockId = tbid);
        }
      }
      return text;
  }

  getProcesses() {
    return this.dataService.getProcesses()
    .then(result => {return result.results;});
  }

  getSubProcesses() {
    return this.dataService.getSubProcesses()
    .then(result => {return result.results;});
  }

  getProcessSequences() {
    return this.dataService.getProcessSequences()
    .then(result => {return result.results;});
  }

  getSubProcessSequences() {
    return this.dataService.getSubProcessSequences()
    .then(result => {return result.results;});
  }

  getTextBlockFabSpecs() {
    return this.dataService.getTextBlockFabSpecs()
    .then(result => {return result.results;});
  }

  getTextBlocks() {
    return this.dataService.getTextBlocks()
    .then(result => {return result.results;});
  }

}

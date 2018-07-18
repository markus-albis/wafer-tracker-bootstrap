import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {logger} from 'services/log';
import settings from '/dist/settings';

@inject(HttpClient)
export class MigrateData {

fileSystemService = settings.fileSystemService;
databaseMigrationService = settings.databaseMigrationService;
sourceDatabase="//server3/users/db/production/productiondata.mdx"
targetDatabase="Local instance of MySQL56";
sourceDb = {name: "", type: "", file:null};
targetDb = "";
// tables= ["EpiType", "EpiSupplier", "WaferType", "WaferSize", "WaferSupplier", "ProductFamiliy", "LotNumber", "Mask", "ProductName", "Wafer", "WaferStatus", "Technician", "WaferLocation", "ProcessGroup", "ProcessSequence", "Layer", "SPC_Parameter", "SPC_Acquisition", "SPC_Data", "SPC_Data_Type", "Line" ];
// tables= ["EpiType", "EpiSupplier", "WaferType", "WaferSize", "WaferSupplier", "ProductFamiliy", "LotNumber", "Mask", "ProductName", "Technician", "WaferLocation", "Wafer", ];
tables=["WaferStatus"]
progress="width: 0%";
progress="width: 0%";
progressInfo = "";
progressPercent = 0;

  constructor(http) {
    this.http=http;
  }

  activate(){
    //$.material.init();
  }

  attached(){
  }

  start() {

        this.progressPercent = this.progressPercent + 5;
        this.progress="width: "+ this.progressPercent+ "%";

        let promise = Promise.resolve(null);
        // Migrate individual tables
        for (let table of this.tables) {
          promise = promise.then(() => {
            this.progressInfo = "Migrating " + table + "......";
            this.progressPercent = this.progressPercent + 3;
            this.progress="width: "+ this.progressPercent+ "%";
            return this.migrateTable(table)});
        }
        promise = promise.then(() => {
        this.progressInfo = "Database migration successfully completed";
        this.progress="width: 100%";
      });
  }


  migrateTable(table) {
    let data = {
      "table": table
    };
    return this.http.createRequest(this.databaseMigrationService + "/MigrateTable")
        .asPost()
        .withHeader('Content-Type', 'application/json;charset=utf-8')
        .withContent(data)
        .send()
        .then(response => {
        }).catch(err => {
          console.log(err);
        });
  }




}

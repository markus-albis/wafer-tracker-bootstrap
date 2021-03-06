import {bindable } from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-http-client';
import $ from 'jquery';
import {logger} from 'services/log';
import settings from './settings';
//import {AuthService} from 'paulvanbladel/aureliauth';

@ inject (HttpClient)
export class App {
  // _isAuthenticated=false;

  statusMessage1 = "Selected Wafer: No wafer selected";   // Selected wafer
  statusMessage2 = "Product Name: "; // Product Name
  statusMessage3 = "Lot: "; // Lot
  statusMessage4 = "Data service: not connected"
  systemTestService = settings.systemTestService;

  constructor(http){
    this.http = http;
    this.primaryColor = settings.primaryColor;
    this.accentColor = settings.accentColor;
    this.errorColor = settings.errorColor;
  }


  configureRouter(config,router){
    config.title='Wafer Tracker';
    // config.options.pushState = true;
    config.map([
      {route: ['','home'], name: 'home', moduleId: './home/home', nav: true, title: 'Home'},
      {route: 'template', name: 'template', moduleId: './template/template', nav: false, title: 'Template'},
      {route: 'tracker', name: 'tracker', moduleId: './tracker/tracker', nav: true, title: 'Tracker'},
      {route: 'kanban', name: 'kanban', moduleId: './kanban/kanban', nav: true, title: 'Kanban'},
      {route: 'spc', name: 'spc', moduleId: './spc', nav: true, title: 'SPC'},
      {route: 'reports', name: 'reports', moduleId: './reports', nav: true, title: 'Reports'},
      {route: 'metrics', name: 'metrics', moduleId: './metrics/metrics', nav: true, title: 'Metrics'},
      {route: 'editors', name: 'editors', moduleId: './editors/editors', nav: true, title: 'Editors'},
      {route: 'masterdata', name: 'masterdata', moduleId: './masterdata/masterdata', nav: true, title: 'Master Data'},
      {route: 'tools', name: 'tools', moduleId: './tools/tools', nav: true, title: 'Tools'},
      {route: 'about', name: 'about', moduleId: './about/about', nav: false, title: 'About'},
      {route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login'},
      {route: 'logout', name: 'logout', moduleId: './logout', nav: false, title: 'Logout'}
      // {route: '', redirect: 'template'}
    ])

    this.router=router;
  }

  attached(){
  return this.http.get(this.systemTestService + "/test")
    .then(r => {
      logger.info("Host Service: " + r.content);
      this.statusMessage4 = "Data service: " + r.content;
    });
}

//   constructor(auth ){
//   this.auth = auth;
//
// }

//   get isAuthenticated(){
//   return this.auth.isAuthenticated();
// }
}

export class Editors {

  configureRouter(config,router){
    config.title='Editors';
    config.map([
      {route: ['','fabspec'], name: 'fabspec', moduleId: './fabspec/fabspec_page', nav: true, title: 'Fab Spec'},
      {route: 'process', name: 'process', moduleId: './process/process_page', nav: true, title: 'Process'},
      {route: 'processsequence', name: 'processsequence', moduleId: './processsequence/processsequence_page', nav: true, title: 'Process Sequence'},
      {route: 'subprocess', name: 'subprocess', moduleId: './subprocess/subprocess_page', nav: true, title: 'SubProcess'}
    ])
    this.router=router;
  }




}

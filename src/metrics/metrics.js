export class Template {

  configureRouter(config,router){
    config.title='Template';
    config.map([
      {route: ['','yield1'], name:'yield1', moduleId: './yield1/yield1', nav: true, title: 'Wafer Yield'},
      {route: 'time1', name:'time1', moduleId: './time1/time1', nav: true, title: 'Cycle Time'},
      {route: 'yield2', name:'yield2', moduleId: './yield2/yield2', nav: true, title: 'Device Yield'}
    ])

    this.router=router;
  }
}

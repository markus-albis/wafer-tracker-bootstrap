export class Template {

  configureRouter(config,router){
    config.title='Template';
    config.map([
      {route: ['','task1'], name:'task1', moduleId: './task1/task1', nav: true, title: 'Task 1'},
      {route: 'task2', name:'task2', moduleId: './task2/task2', nav: true, title: 'Task 2'},
      {route: 'task3', name:'task3', moduleId: './task3/task3', nav: true, title: 'Task 3'}
    ])

    this.router=router;
  }
}

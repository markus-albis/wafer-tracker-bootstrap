import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';

@inject(AppRouter,DataService)
export class ProcessItem extends ItemViewModel {

  constructor(router,service) {
    super('process',router,service);
  }

  get title() {
    if (this.entity.FailureCategoryId <= 0) {
      return 'New Process';
    }
    return `Process #${this.entity.ProcessId}`;
  }
}

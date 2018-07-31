import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';

@inject(AppRouter,DataService)
export class WaferStateItem extends ItemViewModel {

  constructor(router,service) {
    super('waferstates',router,service);
  }

  get title() {
    if (this.entity.WaferStateId <= 0) {
      return 'New Wafer State';
    }
    return `Wafer State #${this.entity.WaferStateId}`;
  }
}

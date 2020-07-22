import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';

@inject(AppRouter,DataService)
export class FabSpecItem extends ItemViewModel {

  constructor(router,service) {
    super('fabspecs',router,service);
  }

  get title() {
    if (this.entity.FabSpecId <= 0) {
      return 'New Fab Spec';
    }
    return `Fab Spec #${this.entity.FabSpecId}`;
  }
}

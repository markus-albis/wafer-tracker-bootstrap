import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';

@inject(AppRouter,DataService)
export class MaskItem extends ItemViewModel {

  constructor(router,service) {
    super('masks',router,service);
  }

  get title() {
    if (this.entity.MaskID <= 0) {
      return 'New Mask';
    }
    return `Mask #${this.entity.MaskID}`;
  }
}

import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';

@inject(AppRouter,DataService)
export class FailureCategoryItem extends ItemViewModel {

  constructor(router,service) {
    super('failurecategories',router,service);
  }

  get title() {
    if (this.entity.FailureCategoryId <= 0) {
      return 'New Failure Category';
    }
    return `Failure Category #${this.entity.FailureCategoryId}`;
  }
}

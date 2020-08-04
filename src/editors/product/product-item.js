import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';

@inject(AppRouter,DataService)
export class ProductItem extends ItemViewModel {

  constructor(router,service) {
    super('products',router,service);
  }

  get title() {
    if (this.entity.ProductId <= 0) {
      return 'New Product';
    }
    return `Product #${this.entity.ProductId}`;
  }
}

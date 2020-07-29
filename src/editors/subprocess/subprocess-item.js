import {ItemViewModel} from '../item-viewmodel';
import {inject} from 'aurelia-dependency-injection';
import {DataService}  from 'services/dataservice';
import {AppRouter} from 'aurelia-router';
import Showdown from 'showdown';

@inject(AppRouter,DataService)
export class SubProcessItem extends ItemViewModel {

  constructor(router,service) {
    super('subprocess',router,service);
    this.converter = new Showdown.Converter();
  }

  get title() {
    return `SubProcess Editor`;
  }

  get item() {
    if (this.entity.SubProcessId <= 0) {
      return 'New SubProcess';
    }
    return `SubProcess: ${this.entity.SubProcessName}`;
  }

  get PrintText() {
      return this.converter.makeHtml(this.entity.DefaultText)
  }
}

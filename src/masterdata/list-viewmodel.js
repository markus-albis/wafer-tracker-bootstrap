import {logger} from 'services/log';

export class ListViewModel {
  router;
  route;
  service;
  entities = [];
  isLoading = false;

  constructor(route, router, service) {
    this.route = route;
    this.router = router;
    this.service = service;
  }

  activate() {
    this.load();
  }

  load() {
    this.isLoading = true;
  }

  rowSelected(id){
    logger.info("Row selected: ", id)
    this.open(id);
  }

  open(id) {
    logger.info("Navigating to:" + this.route + '/' + id);
    this.router.navigate("#/masterdata/" + this.route + '/' + id);
  }
}

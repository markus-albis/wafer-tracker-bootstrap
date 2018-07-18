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
    this.service.getPage(this.pageIndex)
      .then(result => {
        this.entities = result.entities;
        this.isLoading = false;
      });
  }

  open(id) {
    console.log("Navigating to: /maintenance/"+ this.route + '/' + id);
    this.router.navigate("/maintenance/"+ this.route + '/' + id);
  }
}

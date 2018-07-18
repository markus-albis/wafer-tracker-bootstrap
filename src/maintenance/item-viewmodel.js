import toastr from 'toastr';

export class ItemViewModel {
  route;
  router;
  service;
  entityManager;
  entity;

  constructor(route,router,service) {
    this.route = route;
    this.router = router;
    this.service = service;
  }

  activate(params, config) {
    var result;

    var entityType = config.title;
    var id = params.id;

    // load or create the entity.
    if (params.id === 'new') {
      result = this.service.createNew(entityType);
    } else {
      result = this.service.loadExisting(entityType, id);
    }
    this.entityManager = result.entityManager;
    this.entity = result.entity;

    return
  }

  canDeactivate() {
    // permit navigating away from new entities.
    if (this.entity.entityAspect.entityState.isAdded()) {
      return true;
    }
    // permit navigating away from unmodified entities.
    return true;
  }

  get hasChanges() {
    return this.entityManager.hasChanges();
  }

  save() {
    this.entityManager.saveChanges();
    toastr.options.positionClass = "toast-bottom-right";
    toastr.success( "Changes saved.", "Saving to database");
    this.router.navigate("/maintenance/"+ this.route);
  }

  cancel() {
    this.entityManager.rejectChanges();
    this.router.navigate("/maintenance/"+ this.route);
  }
}

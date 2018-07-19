import breeze from 'breeze';
import AutoGeneratedKeyType from 'breeze';
import settings from '../settings';
import {logger} from 'services/log';

export class DataService {

  serviceName = settings.serviceName;
  manager = new breeze.EntityManager(this.serviceName);

  getFailureCategories() {
    var query = breeze.EntityQuery.from("FailureCategories");
    return this.manager.executeQuery(query);
  }

  getLots() {
    var query = breeze.EntityQuery.from("Lots");
    return this.manager.executeQuery(query);
  }

  getMasks() {
    var query = breeze.EntityQuery.from("Masks");
    return this.manager.executeQuery(query);
  }

  getProducts() {
    var query = breeze.EntityQuery.from("Products");
    return this.manager.executeQuery(query);
  }

  getWafers() {
    var query = breeze.EntityQuery.from("Wafers");
    return this.manager.executeQuery(query);
  }

  getWaferLocations() {
    var query = breeze.EntityQuery.from("WaferLocations");
    return this.manager.executeQuery(query);
  }

  getWaferHistories() {
    var query = breeze.EntityQuery.from("WaferHistories");
    return this.manager.executeQuery(query);
  }

  getWaferStates() {
    var query = breeze.EntityQuery.from("WaferStates");
    return this.manager.executeQuery(query);
  }

  // Used to load an existing entity from cache
  loadExisting(entityType,id) {
      return {
        entity: this.manager.getEntityByKey(entityType,id),
        entityManager: this.manager
      };
  // });
}

  // Used to create a new entity
  createNew(type) {
      console.log(type);
      return {
        entity: this.manager.createEntity(type),
        entityManager: this.manager
      };
    };

}

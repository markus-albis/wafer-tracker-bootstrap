export class SubProcessModel {

    IsSelected = false;
    SubProcess = {};

    constructor (subprocess, selected) {
        this.SubProcess = subprocess;
        this.IsSelected = selected;
    }
}
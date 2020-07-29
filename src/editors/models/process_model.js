export class ProcessModel {

    IsSelected = false;
    Process = {};

    constructor (process, selected) {
        this.Process = process;
        this.IsSelected = selected;
    }
}
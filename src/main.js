
import 'materialize-css';
import 'aurelia-polyfills';
import {PLATFORM} from 'aurelia-pal';
import {LogManager} from "aurelia-framework";
import {ConsoleAppender} from "aurelia-logging-console";

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);


export function configure(aurelia) {

    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .plugin('aurelia-animator-css')
      .plugin('aurelia-breeze')
      .plugin('aurelia-table')
      .plugin('aurelia-materialize-bridge', bridge => bridge.useAll())

    aurelia.start().then(a => a.setRoot());


}

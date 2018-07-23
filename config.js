System.config({
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "es7.decorators",
      "es7.classProperties",
      "runtime"
    ]
  },
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "arrive": "npm:arrive@2.4.1",
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.4",
    "aurelia-binding": "npm:aurelia-binding@1.7.1",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@2.3.0",
    "aurelia-breeze": "npm:aurelia-breeze@2.2.0",
    "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
    "aurelia-dialog": "npm:aurelia-dialog@1.0.0-rc.2.0.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.4.0",
    "aurelia-framework": "npm:aurelia-framework@1.3.0",
    "aurelia-history": "npm:aurelia-history@1.1.0",
    "aurelia-history-browser": "npm:aurelia-history-browser@1.2.0",
    "aurelia-html-import-template-loader": "npm:aurelia-html-import-template-loader@1.0.0",
    "aurelia-http-client": "npm:aurelia-http-client@1.3.0",
    "aurelia-loader": "npm:aurelia-loader@1.0.0",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.4",
    "aurelia-logging": "npm:aurelia-logging@1.5.0",
    "aurelia-materialize-bridge": "npm:aurelia-materialize-bridge@0.31.0",
    "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
    "aurelia-pal": "npm:aurelia-pal@1.8.0",
    "aurelia-pal-browser": "npm:aurelia-pal-browser@1.8.0",
    "aurelia-path": "npm:aurelia-path@1.1.1",
    "aurelia-polyfills": "npm:aurelia-polyfills@1.3.0",
    "aurelia-polymer": "github:bnavetta/aurelia-polymer@0.2.1",
    "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.2.0",
    "aurelia-router": "npm:aurelia-router@1.6.1",
    "aurelia-table": "github:tochoromero/aurelia-table@0.1.13",
    "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1",
    "aurelia-templating": "npm:aurelia-templating@1.8.1",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.4.3",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.7.1",
    "aurelia-templating-router": "npm:aurelia-templating-router@1.3.2",
    "aurelia/animator-css": "github:aurelia/animator-css@0.15.0",
    "aurelia/binding": "github:aurelia/binding@0.8.6",
    "aurelia/bootstrapper": "github:aurelia/bootstrapper@0.16.0",
    "aurelia/dependency-injection": "github:aurelia/dependency-injection@0.9.2",
    "aurelia/event-aggregator": "github:aurelia/event-aggregator@0.7.0",
    "aurelia/fetch-client": "github:aurelia/fetch-client@0.1.2",
    "aurelia/framework": "github:aurelia/framework@0.15.0",
    "aurelia/history": "github:aurelia/history@0.6.1",
    "aurelia/history-browser": "github:aurelia/history-browser@0.7.0",
    "aurelia/loader": "github:aurelia/loader@0.8.7",
    "aurelia/loader-default": "github:aurelia/loader-default@0.9.5",
    "aurelia/logging": "github:aurelia/logging@0.6.4",
    "aurelia/metadata": "github:aurelia/metadata@0.7.3",
    "aurelia/path": "github:aurelia/path@0.8.1",
    "aurelia/route-recognizer": "github:aurelia/route-recognizer@0.6.2",
    "aurelia/router": "github:aurelia/router@0.11.0",
    "aurelia/task-queue": "github:aurelia/task-queue@0.6.2",
    "aurelia/templating": "github:aurelia/templating@0.14.4",
    "aurelia/templating-binding": "github:aurelia/templating-binding@0.14.0",
    "aurelia/templating-resources": "github:aurelia/templating-resources@0.14.0",
    "aurelia/templating-router": "github:aurelia/templating-router@0.15.0",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "bootstrap": "github:twbs/bootstrap@3.3.7",
    "breeze": "npm:breeze-client@1.7.1",
    "charlespockert/aurelia-bs-grid": "github:charlespockert/aurelia-bs-grid@0.0.4",
    "core-js": "npm:core-js@1.2.7",
    "crossfilter": "npm:crossfilter@1.3.12",
    "css": "github:systemjs/plugin-css@0.1.37",
    "d3": "npm:d3@5.5.0",
    "datatables": "github:DataTables/DataTables@1.10.19",
    "dc": "npm:dc@3.0.6",
    "font-awesome": "npm:font-awesome@4.6.3",
    "google-palette": "npm:google-palette@1.1.0",
    "hammer": "github:hammerjs/hammer.js@2.0.8",
    "jquery": "github:components/jquery@2.2.4",
    "mWater/FileSaver.js": "github:mWater/FileSaver.js@master",
    "materialize-css": "npm:materialize-css@0.100.2",
    "moment": "npm:moment@2.22.2",
    "ms-signalr-client": "npm:ms-signalr-client@2.2.7",
    "numeral": "npm:numeral@1.5.6",
    "paulvanbladel/aureliauth": "github:paulvanbladel/aurelia-auth@0.9.19",
    "store.js": "npm:store.js@1.1.0",
    "toastr": "github:CodeSeven/toastr@2.1.4",
    "underscore": "npm:underscore@1.9.1",
    "github:CodeSeven/toastr@2.1.4": {
      "css": "github:systemjs/plugin-css@0.1.37",
      "jquery": "npm:jquery@2.2.4"
    },
    "github:DataTables/DataTables@1.10.19": {
      "css": "github:systemjs/plugin-css@0.1.37",
      "jquery": "npm:jquery@2.2.4"
    },
    "github:aurelia/animator-css@0.15.0": {
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-templating": "github:aurelia/templating@0.14.4"
    },
    "github:aurelia/binding@0.10.2": {
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/binding@0.8.6": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/binding@0.9.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/bootstrapper@0.16.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.7.0",
      "aurelia-framework": "github:aurelia/framework@0.15.0",
      "aurelia-history": "github:aurelia/history@0.6.1",
      "aurelia-history-browser": "github:aurelia/history-browser@0.7.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.9.5",
      "aurelia-logging-console": "github:aurelia/logging-console@0.6.2",
      "aurelia-router": "github:aurelia/router@0.11.0",
      "aurelia-templating": "github:aurelia/templating@0.14.4",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.14.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.14.0",
      "aurelia-templating-router": "github:aurelia/templating-router@0.15.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/bootstrapper@0.17.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-framework": "github:aurelia/framework@0.16.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-history-browser": "github:aurelia/history-browser@0.8.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.10.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.7.1",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.15.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.15.2",
      "aurelia-templating-router": "github:aurelia/templating-router@0.16.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.10.1": {
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.11.2": {
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/dependency-injection@0.9.2": {
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/event-aggregator@0.7.0": {
      "aurelia-logging": "github:aurelia/logging@0.6.4"
    },
    "github:aurelia/event-aggregator@0.8.0": {
      "aurelia-logging": "github:aurelia/logging@0.7.0"
    },
    "github:aurelia/event-aggregator@0.9.0": {
      "aurelia-logging": "github:aurelia/logging@0.8.0"
    },
    "github:aurelia/fetch-client@0.1.2": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.15.0": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "aurelia-templating": "github:aurelia/templating@0.14.4",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.16.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/framework@0.17.0": {
      "aurelia-binding": "github:aurelia/binding@0.10.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-loader": "github:aurelia/loader@0.10.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.16.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/history-browser@0.7.0": {
      "aurelia-history": "github:aurelia/history@0.6.1",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/history-browser@0.8.0": {
      "aurelia-history": "github:aurelia/history@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/http-client@0.12.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/loader-default@0.10.0": {
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0"
    },
    "github:aurelia/loader-default@0.9.5": {
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3"
    },
    "github:aurelia/loader@0.10.0": {
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-path": "github:aurelia/path@0.10.0"
    },
    "github:aurelia/loader@0.8.7": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "core-js": "npm:core-js@0.9.18",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.6.3"
    },
    "github:aurelia/loader@0.9.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "github:zloirock/core-js@0.8.4"
    },
    "github:aurelia/logging-console@0.6.2": {
      "aurelia-logging": "github:aurelia/logging@0.6.4"
    },
    "github:aurelia/logging-console@0.7.1": {
      "aurelia-logging": "github:aurelia/logging@0.7.0"
    },
    "github:aurelia/metadata@0.7.3": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/metadata@0.8.0": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/metadata@0.9.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.6.2": {
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.7.0": {
      "aurelia-path": "github:aurelia/path@0.9.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/route-recognizer@0.8.0": {
      "aurelia-path": "github:aurelia/path@0.10.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.11.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.7.0",
      "aurelia-history": "github:aurelia/history@0.6.1",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.12.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.8.0",
      "aurelia-history": "github:aurelia/history@0.7.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/router@0.13.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.9.0",
      "aurelia-history": "github:aurelia/history@0.8.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/task-queue@0.8.0": {
      "aurelia-pal": "github:aurelia/pal@0.2.0"
    },
    "github:aurelia/templating-binding@0.14.0": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-templating": "github:aurelia/templating@0.14.4"
    },
    "github:aurelia/templating-binding@0.15.0": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:aurelia/templating-resources@0.14.0": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "aurelia-templating": "github:aurelia/templating@0.14.4",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-resources@0.15.2": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating-router@0.15.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-router": "github:aurelia/router@0.11.0",
      "aurelia-templating": "github:aurelia/templating@0.14.4"
    },
    "github:aurelia/templating-router@0.16.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-router": "github:aurelia/router@0.12.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:aurelia/templating@0.14.4": {
      "aurelia-binding": "github:aurelia/binding@0.8.6",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.9.2",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.2.0",
      "aurelia-loader": "github:aurelia/loader@0.8.7",
      "aurelia-logging": "github:aurelia/logging@0.6.4",
      "aurelia-metadata": "github:aurelia/metadata@0.7.3",
      "aurelia-path": "github:aurelia/path@0.8.1",
      "aurelia-task-queue": "github:aurelia/task-queue@0.6.2",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.15.3": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.3.0",
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-path": "github:aurelia/path@0.9.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.7.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:aurelia/templating@0.16.0": {
      "aurelia-binding": "github:aurelia/binding@0.10.2",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.11.2",
      "aurelia-loader": "github:aurelia/loader@0.10.0",
      "aurelia-logging": "github:aurelia/logging@0.8.0",
      "aurelia-metadata": "github:aurelia/metadata@0.9.0",
      "aurelia-pal": "github:aurelia/pal@0.2.0",
      "aurelia-path": "github:aurelia/path@0.10.0",
      "aurelia-task-queue": "github:aurelia/task-queue@0.8.0",
      "core-js": "npm:core-js@0.9.18"
    },
    "github:charlespockert/aurelia-bs-grid@0.0.4": {
      "aurelia-binding": "github:aurelia/binding@0.9.1",
      "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.17.0",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.10.1",
      "aurelia-logging": "github:aurelia/logging@0.7.0",
      "aurelia-metadata": "github:aurelia/metadata@0.8.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3",
      "charlespockert/aurelia-compiler": "github:charlespockert/aurelia-compiler@0.0.7"
    },
    "github:charlespockert/aurelia-compiler@0.0.7": {
      "aurelia-loader": "github:aurelia/loader@0.9.0",
      "aurelia-loader-default": "github:aurelia/loader-default@0.10.0",
      "aurelia-templating": "github:aurelia/templating@0.15.3"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.1.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:paulvanbladel/aurelia-auth@0.9.19": {
      "aurelia-framework": "github:aurelia/framework@0.17.0",
      "aurelia-http-client": "github:aurelia/http-client@0.12.0",
      "aurelia-router": "github:aurelia/router@0.13.0"
    },
    "github:tochoromero/aurelia-table@0.1.13": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "github:twbs/bootstrap@3.3.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:arrive@2.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-animator-css@1.0.4": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-binding@1.7.1": {
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1"
    },
    "npm:aurelia-binding@2.1.1": {
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1"
    },
    "npm:aurelia-bootstrapper@2.3.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.3.0",
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.2.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.4",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.8.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.3.0",
      "aurelia-router": "npm:aurelia-router@1.6.1",
      "aurelia-templating": "npm:aurelia-templating@1.8.1",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.4.3",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.7.1",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.3.2"
    },
    "npm:aurelia-breeze@2.2.0": {
      "aurelia-binding": "npm:aurelia-binding@1.7.1",
      "aurelia-fetch-client": "npm:aurelia-fetch-client@1.4.0",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-templating": "npm:aurelia-templating@1.8.1",
      "breeze-client": "npm:breeze-client@1.7.1"
    },
    "npm:aurelia-dependency-injection@1.4.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-dialog@1.0.0-rc.2.0.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-event-aggregator@1.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.5.0"
    },
    "npm:aurelia-fetch-client@1.4.0": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-framework@1.3.0": {
      "aurelia-binding": "npm:aurelia-binding@2.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-history-browser@1.2.0": {
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-html-import-template-loader@1.0.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "webcomponentsjs": "npm:webcomponents.js@0.7.24"
    },
    "npm:aurelia-http-client@1.3.0": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-loader-default@1.0.4": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-loader@1.0.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-logging-console@1.0.0": {
      "aurelia-logging": "npm:aurelia-logging@1.5.0"
    },
    "npm:aurelia-materialize-bridge@0.31.0": {
      "aurelia-binding": "npm:aurelia-binding@1.7.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-router": "npm:aurelia-router@1.6.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-metadata@1.0.4": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-pal-browser@1.8.0": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-polyfills@1.3.0": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-route-recognizer@1.2.0": {
      "aurelia-path": "npm:aurelia-path@1.1.1"
    },
    "npm:aurelia-router@1.6.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.1",
      "aurelia-history": "npm:aurelia-history@1.1.0",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.2.0"
    },
    "npm:aurelia-task-queue@1.3.1": {
      "aurelia-pal": "npm:aurelia-pal@1.8.0"
    },
    "npm:aurelia-templating-binding@1.4.3": {
      "aurelia-binding": "npm:aurelia-binding@2.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-templating-resources@1.7.1": {
      "aurelia-binding": "npm:aurelia-binding@2.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-templating-router@1.3.2": {
      "aurelia-binding": "npm:aurelia-binding@2.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-router": "npm:aurelia-router@1.6.1",
      "aurelia-templating": "npm:aurelia-templating@1.8.1"
    },
    "npm:aurelia-templating@1.8.1": {
      "aurelia-binding": "npm:aurelia-binding@2.1.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.4.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0",
      "aurelia-logging": "npm:aurelia-logging@1.5.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.4",
      "aurelia-pal": "npm:aurelia-pal@1.8.0",
      "aurelia-path": "npm:aurelia-path@1.1.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.3.1"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.1.0": {
      "base64-js": "npm:base64-js@1.3.0",
      "ieee754": "npm:ieee754@1.1.12"
    },
    "npm:commander@2.16.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:crossfilter2@1.4.6": {
      "lodash.result": "npm:lodash.result@4.5.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:crossfilter@1.3.12": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:d3-brush@1.0.4": {
      "d3-dispatch": "npm:d3-dispatch@1.0.3",
      "d3-drag": "npm:d3-drag@1.2.1",
      "d3-interpolate": "npm:d3-interpolate@1.2.0",
      "d3-selection": "npm:d3-selection@1.3.0",
      "d3-transition": "npm:d3-transition@1.1.1"
    },
    "npm:d3-chord@1.0.4": {
      "d3-array": "npm:d3-array@1.2.1",
      "d3-path": "npm:d3-path@1.0.5"
    },
    "npm:d3-contour@1.3.0": {
      "d3-array": "npm:d3-array@1.2.1"
    },
    "npm:d3-drag@1.2.1": {
      "d3-dispatch": "npm:d3-dispatch@1.0.3",
      "d3-selection": "npm:d3-selection@1.3.0"
    },
    "npm:d3-dsv@1.0.8": {
      "commander": "npm:commander@2.16.0",
      "iconv-lite": "npm:iconv-lite@0.4.23",
      "rw": "npm:rw@1.3.3"
    },
    "npm:d3-fetch@1.1.0": {
      "d3-dsv": "npm:d3-dsv@1.0.8"
    },
    "npm:d3-force@1.1.0": {
      "d3-collection": "npm:d3-collection@1.0.4",
      "d3-dispatch": "npm:d3-dispatch@1.0.3",
      "d3-quadtree": "npm:d3-quadtree@1.0.3",
      "d3-timer": "npm:d3-timer@1.0.7",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:d3-geo@1.10.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "d3-array": "npm:d3-array@1.2.1"
    },
    "npm:d3-interpolate@1.2.0": {
      "d3-color": "npm:d3-color@1.2.0"
    },
    "npm:d3-scale-chromatic@1.3.0": {
      "d3-color": "npm:d3-color@1.2.0",
      "d3-interpolate": "npm:d3-interpolate@1.2.0"
    },
    "npm:d3-scale@2.1.0": {
      "d3-array": "npm:d3-array@1.2.1",
      "d3-collection": "npm:d3-collection@1.0.4",
      "d3-format": "npm:d3-format@1.3.0",
      "d3-interpolate": "npm:d3-interpolate@1.2.0",
      "d3-time": "npm:d3-time@1.0.8",
      "d3-time-format": "npm:d3-time-format@2.1.1"
    },
    "npm:d3-shape@1.2.0": {
      "d3-path": "npm:d3-path@1.0.5"
    },
    "npm:d3-time-format@2.1.1": {
      "d3-time": "npm:d3-time@1.0.8"
    },
    "npm:d3-transition@1.1.1": {
      "d3-color": "npm:d3-color@1.2.0",
      "d3-dispatch": "npm:d3-dispatch@1.0.3",
      "d3-ease": "npm:d3-ease@1.0.3",
      "d3-interpolate": "npm:d3-interpolate@1.2.0",
      "d3-selection": "npm:d3-selection@1.3.0",
      "d3-timer": "npm:d3-timer@1.0.7"
    },
    "npm:d3-zoom@1.7.1": {
      "d3-dispatch": "npm:d3-dispatch@1.0.3",
      "d3-drag": "npm:d3-drag@1.2.1",
      "d3-interpolate": "npm:d3-interpolate@1.2.0",
      "d3-selection": "npm:d3-selection@1.3.0",
      "d3-transition": "npm:d3-transition@1.1.1"
    },
    "npm:d3@5.5.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "d3-array": "npm:d3-array@1.2.1",
      "d3-axis": "npm:d3-axis@1.0.8",
      "d3-brush": "npm:d3-brush@1.0.4",
      "d3-chord": "npm:d3-chord@1.0.4",
      "d3-collection": "npm:d3-collection@1.0.4",
      "d3-color": "npm:d3-color@1.2.0",
      "d3-contour": "npm:d3-contour@1.3.0",
      "d3-dispatch": "npm:d3-dispatch@1.0.3",
      "d3-drag": "npm:d3-drag@1.2.1",
      "d3-dsv": "npm:d3-dsv@1.0.8",
      "d3-ease": "npm:d3-ease@1.0.3",
      "d3-fetch": "npm:d3-fetch@1.1.0",
      "d3-force": "npm:d3-force@1.1.0",
      "d3-format": "npm:d3-format@1.3.0",
      "d3-geo": "npm:d3-geo@1.10.0",
      "d3-hierarchy": "npm:d3-hierarchy@1.1.6",
      "d3-interpolate": "npm:d3-interpolate@1.2.0",
      "d3-path": "npm:d3-path@1.0.5",
      "d3-polygon": "npm:d3-polygon@1.0.3",
      "d3-quadtree": "npm:d3-quadtree@1.0.3",
      "d3-random": "npm:d3-random@1.1.0",
      "d3-scale": "npm:d3-scale@2.1.0",
      "d3-scale-chromatic": "npm:d3-scale-chromatic@1.3.0",
      "d3-selection": "npm:d3-selection@1.3.0",
      "d3-shape": "npm:d3-shape@1.2.0",
      "d3-time": "npm:d3-time@1.0.8",
      "d3-time-format": "npm:d3-time-format@2.1.1",
      "d3-timer": "npm:d3-timer@1.0.7",
      "d3-transition": "npm:d3-transition@1.1.1",
      "d3-voronoi": "npm:d3-voronoi@1.1.2",
      "d3-zoom": "npm:d3-zoom@1.7.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:dc@3.0.6": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "crossfilter2": "npm:crossfilter2@1.4.6",
      "d3": "npm:d3@5.5.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.37"
    },
    "npm:hammerjs@2.0.8": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:iconv-lite@0.4.23": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "safer-buffer": "npm:safer-buffer@2.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash.result@4.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:materialize-css@0.100.2": {
      "hammerjs": "npm:hammerjs@2.0.8",
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:ms-signalr-client@2.2.7": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:numeral@1.5.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:rw@1.3.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:safer-buffer@2.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.1"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:webcomponents.js@0.7.24": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});

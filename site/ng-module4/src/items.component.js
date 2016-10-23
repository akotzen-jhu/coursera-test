(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/itemsList.html',
  bindings: {
    items: '<'
  }
});

})();

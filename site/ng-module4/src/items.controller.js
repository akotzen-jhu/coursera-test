(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService','$stateParams','items'];
function ItemsController(items) {
  var itemsCtrl = this;
  itemsCtrl.items = items;
}

})();

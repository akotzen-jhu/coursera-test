(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/categoriesList.html',
  bindings: {
    categories: '<'
  }
});

})();

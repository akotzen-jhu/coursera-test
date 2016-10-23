(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
  var service = this;

  var endpoints = {
    categories: 'https://davids-restaurant.herokuapp.com/categories.json',
    menuItems: 'https://davids-restaurant.herokuapp.com/menu_items.json?category='
  };

  service.getAllCategories = function() {
    var promise = $http({ method: "GET", url: endpoints.categories });
    return promise;
  };

  service.getItemsForCategory = function(categoryShortName) {
    var promise = $http({ method: "GET", url: endpoints.menuItems + categoryShortName });
    return promise;
  };
}

})();

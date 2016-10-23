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
    var promise = $http({ method: "GET", url: endpoints.categories }).
    then(function(response){
      if (!response || !response.data) {
        console.log('No categories found');
        return [];
      }
      return response.data;
    });
    return promise;
  };

  service.getItemsForCategory = function(categoryShortName) {
    var promise = $http({ method: "GET", url: endpoints.menuItems + categoryShortName }).
    then(function(response){
      if (!response || !response.data || !response.data.menu_items) {
        console.log('No category menu items found');
        return [];
      }

      console.log(response.data.menu_items);

      return response.data.menu_items;
    });
    return promise;
  };
}

})();

(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);


RegistrationService.$inject = ['$http'];
function MenuService($http) {
  var service = this;

  //var endpoint = 'https://YOUR-CHOSEN-SUBDOMAIN.herokuapp.com/menu_items/SHORT-NAME.json';
  var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=';
  //var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items/A1.json';

  service.getMenuItem = function(shortName) {

    var promise = $http({ method: "GET", url: endpoint + shortName }).
    then(function(response) {
      if (!response || !response.data || !response.data.menu_items) {
        console.log('No category menu items found');
        return [];
      }

      var menuItems = response.data.menu_items;

      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].short_name == shortName) {
          return menuItems[i];
        }
      }
      return [];
    });
    return promise;
  };

}

})();

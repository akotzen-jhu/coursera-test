(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['$http'];
function MenuService($http) {
  var service = this;

  //var endpoint = 'https://YOUR-CHOSEN-SUBDOMAIN.herokuapp.com/menu_items/SHORT-NAME.json';
  var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=';

  var hasValidMenuItem = false;

  // The cached menu item.
  var menuItem = {};

  // The cached abbreviation (Example: "A" instead of "A1")
  var menuCategoryShortName = '';

  // The cached user registration.
  var registration = {};

  service.getMenuCategoryShortName = function() {
    return menuCategoryShortName;
  };

  service.getMenuItem = function() {
    return service.menuItem;
  };

  service.hasValidMenuItem = function() {
    return service.hasValidMenuItem === true;
  };

  service.saveRegistration = function(registrationData) {
    registration = registrationData;
  };

  service.getRegistration = function() {
    return registration;
  };

  service.lookupMenuItem = function(shortName) {

    service.hasValidMenuItem = false;
    service.menuItem = {};
    service.registration = {};

    var promise = $http({ method: "GET", url: endpoint + shortName }).
    then(function(response) {
      if (!response || !response.data || !response.data.menu_items) {
        console.log('No category menu items found');
        return [];
      }

      var menuItems = response.data.menu_items;
      var category = response.data.category;

      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].short_name == shortName) {
          service.hasValidMenuItem = true;
          service.menuItem = menuItems[i];
          service.menuCategoryShortName = category.short_name;
          return menuItems[i];
        }
      }
      return [];
    });
    return promise;
  };

}

})();

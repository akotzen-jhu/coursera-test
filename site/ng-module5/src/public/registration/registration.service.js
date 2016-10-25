(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['$http'];
function MenuService($http) {
  var service = this;

  var endpoint = 'http://akotzen1-menu.herokuapp.com/menu_items/{SHORT_NAME}.json'
  //var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=';
  
  var hasValidMenuItem = false;

  // The cached menu item.
  var menuItem = {};

  // The cached abbreviation (Example: "A" instead of "A1")
  var menuCategoryShortName = '';

  // The cached user registration.
  var registration = {};

  var formatEndpoint = function(shortName) {
    return endpoint.replace('{SHORT_NAME}', shortName);
  };

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

    var promise = $http({ method: "GET", url: formatEndpoint(shortName) }).
    then(function(response) {
      // Check for an empty response or a 500 error.
      if (!response || !response.data || (response.data.status && response.data.status === "500")) {
        console.log('No category menu items found');
        return [];
      }

      var menuItems = response.data;

      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].short_name == shortName) {
          service.hasValidMenuItem = true;
          service.menuItem = menuItems[i];
          service.menuCategoryShortName = menuItems[i].category_short_name;
          return menuItems[i];
        }
      }
      return [];
    });
    return promise;
  };

}

})();

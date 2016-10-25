(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['$http'];
function RegistrationService($http) {
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
    console.log('formatEndpoint');
    return endpoint.replace('{SHORT_NAME}', shortName);
  };

  service.getMenuCategoryShortName = function() {
    console.log('service.getMenuCategoryShortName');
    return menuCategoryShortName;
  };

  service.getMenuItem = function() {
    console.log('service.getMenuItem');
    return service.menuItem;
  };

  service.updateRegistrationData = function(registrationData) {
    console.log('service.saveRegistration');
    registration = registrationData;
  };

  service.getRegistration = function() {
    console.log('service.getRegistration');
    return registration;
  };

  service.lookupMenuItem = function(shortName) {

    console.log('service.lookupMenuItem');

    service.hasValidMenuItem = false;
    service.menuItem = {};
    service.registration = {};

    var menuEndpoint = formatEndpoint(shortName);
    console.log('menuEndpoint', menuEndpoint);

    var promise = $http({ method: "GET", url: menuEndpoint});
    promise.then(function(response) {

      console.log('service.lookupMenuItem', promise);

      // Check for an empty response or a 500 error.
      if (!response || !response.data || (response.data.status && response.data.status === "500")) {
        console.log('No category menu items found');
        return [];
      }

      if (response.data.short_name !== shortName) {
        console.log('No category menu items found (short names did not match)');
        return [];
      }

      console.log('Found a menu item', shortName, response.data);
      service.hasValidMenuItem = true;
      service.menuItem = response.data;
      service.menuCategoryShortName = response.data.category_short_name;
      return response.data;
    });
    return promise;
  };

}

})();

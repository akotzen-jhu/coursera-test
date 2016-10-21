(function() {
'use strict';

angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

	var searchCtrl = this;
	searchCtrl.found = [];
	searchCtrl.listIsEmpty = false;
	searchCtrl.searchTerm = '';

	var reset = function() {
		console.log('resetting');
		searchCtrl.found = [];
		searchCtrl.listIsEmpty = false;
	};

	searchCtrl.getMatchedMenuItems = function() {

		reset();

		console.log('getMatchedMenuItems: start');

		// If the search term is empty, don't bother querying the REST service
		if (!searchCtrl.searchTerm || searchCtrl.length === 0) {
			searchCtrl.found = [];
			searchCtrl.listIsEmpty = true;
			searchCtrl.searchTerm = '';

			console.log('getMatchedMenuItems: empty search term');

			return;
		}

		var promise = MenuSearchService.getMatchedMenuItems(searchCtrl.searchTerm);
		promise.then(function(data) {
			searchCtrl.found = data;
			if (data.length === 0) {
				searchCtrl.listIsEmpty = true;
			}
		});
	};

	searchCtrl.removeItem = function (index) {

		// Ensure we have a valid array index.
		if (index < 0) return;

		var itemToRemove = searchCtrl.found[index];
		console.log('index', index, 'itemToRemove', itemToRemove);

		searchCtrl.found.splice(index, 1);
	};
}

function FoundItemsDirective() {
  var ddo = {
  	restrict: 'E',
    templateUrl: 'foundItems.html',
	scope: {
		foundItems: '<',
		onRemove: '&',
		searchTerm: '<'
	}
  };

  return ddo;
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;
	var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items.json';

	service.getMatchedMenuItems = function(searchTerm) {

		console.log('service.getMatchedMenuItems: start, searchTerm =', searchTerm);

		var promise = $http({
	      method: "GET",
	      url: endpoint
	    });

	    return promise.then(function (response) {

	    	console.log('promise.then executing, response =', response);

	    	if (!response || !response.data || !response.data.menu_items) {
	    		console.log('No response found');
	    		return [];
	    	}

	    	var menuItems = response.data.menu_items;

	    	// process result and only keep items that match
	    	var foundItems = [];
	    	for (var i = 0; i < menuItems.length; i++) {
	    		if (menuItems[i].description.indexOf(searchTerm) !== -1) {
	    			foundItems.push(menuItems[i]);
	    		}
	    	}

      		// return processed items
      		return foundItems;
  		})
  		.catch(function (errorResponse) {
			console.log('An error occurred', errorResponse.message);
		});
	};

}

})();

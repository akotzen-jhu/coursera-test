(function() {
'use strict';

angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function ToBuyController(MenuSearchService) {
	var searchCtrl = this;
	searchCtrl.found = [];
	searchCtrl.listIsEmpty = false;
	searchCtrl.searchTerm = '';

	searchCtrl.getMatchedMenuItems = function() {

		// If the search term is empty, don't bother querying the REST service
		if (!searchCtrl.searchTerm || searchCtrl.length === 0) {
			searchCtrl.found = [];
			searchCtrl.listIsEmpty = true;
			searchCtrl.searchTerm = '';
			return;
		}

		var promise = MenuSearchService.getMatchedMenuItems(searchCtrl.searchTerm);
		promise.then(function(data)) {
			searchCtrl.found = data;
			if (data.length === 0) {
				searchCtrl.listIsEmpty = true;
			}
		});
	};

	searchCtrl.removeItem = function (itemIndex) {

		// Ensure we have a valid array index.
		if (itemIndex < 0) return;

		console.log('itemIndex', itemIndex);
		var itemToRemove = searchCtrl.found[itemIndex];
		console.log(itemToRemove);
		searchCtrl.found.splice(itemIndex, 1);
	};
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
	scope: {
		foundItems: '<',
		onRemove: '&'
	}
  };

  return ddo;
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
	var service = this;
	var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items.json';

	service.getMatchedMenuItems = function(searchTerm) {

		var promise = $http({
	      method: "GET",
	      url: endpoint
	    });

	    return promise.then(function (response) {

	    	var data = response.data;

	    	if (!response || !response.data) {
	    		console.log('No response found');
	    		return [];
	    	}

	    	// process result and only keep items that match
	    	var foundItems = [];
	    	for (var i = 0; i < data.length; i++) {
	    		if (data[i].indexOf(searchTerm) !== -1) {
	    			foundItems.push(data[i]);
	    		}
	    	}

      		// return processed items
      		return foundItems;
  		}
  		.catch(function (errorResponse) {
			console.log('An error occurred', errorResponse.message);
		});
	};

}

})();

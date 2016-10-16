(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuyCtrl = this;

	// Set to true to support item removal
	toBuyCtrl.supportsItemRemoval = false;

	// Set to true to support item adding
	toBuyCtrl.supportsItemAdding = false;

	// Set to true to support list count display
	toBuyCtrl.enableDisplayListCount = false;

	// Properties to support item adding.
	toBuyCtrl.itemNameToAdd = '';
	toBuyCtrl.itemQuantityToAdd = 0;

	toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

	toBuyCtrl.removeItem = function(index) {
		ShoppingListCheckOffService.removeToBuyItem(index);
	}

	toBuyCtrl.markAsBought = function(index, name, quantity) {
		ShoppingListCheckOffService.removeToBuyItem(index);
		ShoppingListCheckOffService.addBoughtItem(name, quantity);
	}

	toBuyCtrl.hasNothingToBuy = function() {
		return ShoppingListCheckOffService.getToBuyItems().length === 0;
	}

	toBuyCtrl.addItem = function() {
		ShoppingListCheckOffService.addToBuyItem(
			toBuyCtrl.itemNameToAdd, toBuyCtrl.itemQuantityToAdd);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var boughtCtrl = this;

	// Set to true to support list count display
	boughtCtrl.enableDisplayListCount = false;

	boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

	boughtCtrl.hasNothingBought = function() {
		return ShoppingListCheckOffService.getBoughtItems().length === 0;
	}
}

function ShoppingListCheckOffService() {
	var service = this;

	// Items to buy
	var toBuyItems = [
		{'name':'Cases of Red Bull', 'quantity': 2},
		{'name':'Pizza', 'quantity': 1},
		{'name':'Cans of Diet Mountain Dew', 'quantity': 12},
		{'name':'Cans of Chicken Soup', 'quantity': 6},
		{'name':'Cups of Applesauce', 'quantity': 3},
		{'name':'Watermelons', 'quantity': 2},
		{'name':'Taco seasoning packets', 'quantity': 3},
	];

	// Already-bought items
	var boughtItems = [
	];

	// --------------------------------
	// Items to buy methods
	// --------------------------------
	service.addToBuyItem = function(name, quantity) {
		var item = {
			name: name,
			quantity: quantity,
		};
		toBuyItems.push(item);
	};

	service.removeToBuyItem = function(index) {
		toBuyItems.splice(index, 1);
	};

	service.getToBuyItems = function() {
		return toBuyItems;
	};

	// --------------------------------
	// Already-bought methods
	// --------------------------------
	service.addBoughtItem = function(name, quantity) {
		var item = {
			name: name,
			quantity: quantity,
		};
		boughtItems.push(item);
	};

	// service.removeBoughtItem = function(index) {
	// 	boughtItems.splice(index, 1);
	// };

	service.getBoughtItems = function() {
		return boughtItems;
	};
}

})();
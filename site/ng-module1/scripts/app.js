(function() {
'use strict';

angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

	// Keep a reference to LunchCheckController.
	var self = this;

	// Set up scope properties and functions.
	$scope.lunchText = '';
	$scope.lunchMessage = '';
	$scope.lunchMessageColorClass = 'lunchDefaultTextColor';

	$scope.resetLunchMessage = function() {
		$scope.lunchMessage = '';
		self.setLunchTextColorDefault();
	};

	$scope.processLunchText = function() {

		// Clear the lunch message to avoid having more than one message at
		// a time.
		$scope.lunchMessage = '';

		// Reset the text color of the message.
		self.setLunchTextColorDefault();

		// If input is empty string, display please enter data message.
		if (!$scope.lunchText) {
			self.setLunchMessageEmpty();
			return;
		}
		
		// Holds the original lunch items (including empty strings).
		var lunchList = $scope.lunchText.split(',');

		// Holds the non-empty lunch items.
		// Handles the one,,three, four case where item two is an empty string.
		// Excludes these empty string items. Empty string items are not included
		// in the final count.
		var lunchListNonEmpties = self.removeEmptyLunchItems(lunchList);
		var itemCount = lunchListNonEmpties.length;

		if (itemCount === 0) {
			// Display Empty message.
			self.setLunchMessageEmpty();
		} else if (itemCount <= 3) {
			// Display Enjoy message.
			self.setLunchMessageEnjoy();
		} else {
			// Display Too Much message.
			self.setLunchMessageTooMuch();
		}
	};

	// ------------------------------------
	// Helper methods
	// ------------------------------------

	this.setLunchTextColorDefault = function() {
		$scope.lunchMessageColorClass = 'lunchDefaultTextColor';
	};

	this.setLunchTextColorRed = function() {
		$scope.lunchMessageColorClass = 'lunchRedTextColor';
	};

	this.setLunchTextColorGreen = function() {
		$scope.lunchMessageColorClass = 'lunchGreenTextColor';
	};

	this.setLunchMessageEmpty = function() {
		$scope.lunchMessage = 'Please enter data first';
		self.setLunchTextColorRed();
	};

	this.setLunchMessageEnjoy = function() {
		$scope.lunchMessage = 'Enjoy!';
		self.setLunchTextColorGreen();
	};

	this.setLunchMessageTooMuch = function() {
		$scope.lunchMessage = 'Too much!';
		self.setLunchTextColorGreen();
	};

	this.removeEmptyLunchItems = function(lunchList) {
		// Ensure we actually have an array to check.
		if (!lunchList instanceof Array) {
			console.log('empty input array');
			return [];
		}

		// Set up the array we'll return.
		var lunchListNonEmpties = [];

		for (var i = 0; i < lunchList.length; i++) {
			var lunchItem = lunchList[i];

			if (lunchItem.length !== 0) {
				lunchListNonEmpties.push(lunchItem);
			}
		}
		return lunchListNonEmpties;
	}
}

})();
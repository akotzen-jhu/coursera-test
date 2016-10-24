(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['RegistrationService'];
function SignupController(RegistrationService) {

	var signupCtrl = this;
	var hasValidMenuItem = false;
	var foundMenuItem = {};

	signupCtrl.registration = {
		account: {
			firstName: '',
			lastName: '', 
			emailAddress: '',
			phoneNumber: ''
		},
		menuItem: {
			shortName: ''
		}
	};

	signupCtrl.hasValidMenuItem = function() {

		var shortName = signupCtrl.registration.menuItem.shortName || '';
		if (shortName.length === 0) {
			hasValidMenuItem = false;
			foundMenuItem = {};
			return false;
		}

		if (signupCtrl.hasValidMenuItem) return true;

		var menuItem = RegistrationService.lookupMenuItem(signupCtrl.registration.menuItem.shortName);
		if (RegistrationService.hasValidMenuItem()) {
			foundMenuItem = menuItem;
			hasValidMenuItem = true;
			return true;
		}

		return false;
	}

	signupCtrl.saveRegistration = function() {

		if ()



		RegistrationService.saveRegistration(signupCtrl.registration);
	};
}

})();
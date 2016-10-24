(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['RegistrationService'];
function SignupController(RegistrationService) {

	var signupCtrl = this;
	var hasValidMenuItem = false;
	var foundMenuItem = {};
	var successMessage = 'Your information has been saved';
	var errorMessage = 'There was a problem saving your data';

	signupCtrl.dataSavedMessage = '';

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

		// Ensure the textfield has data in it.
		var shortName = signupCtrl.registration.menuItem.shortName || '';
		if (shortName.length === 0) {
			hasValidMenuItem = false;
			foundMenuItem = {};
			return false;
		}

		// Check if we have already looked up and found a menu item from the server.
		// If so that menu item has already been cached in the service.
		if (hasValidMenuItem) return true;

		// We have not looked up the menu item. Look it up using the service.
		var menuItem = RegistrationService.lookupMenuItem(signupCtrl.registration.menuItem.shortName);
		if (RegistrationService.hasValidMenuItem()) {
			RegistrationService.saveRegistration(signupCtrl.registration);
			foundMenuItem = menuItem;
			hasValidMenuItem = true;
			return true;
		}

		// Default
		return false;
	}

	signupCtrl.saveRegistration = function() {

		// We have already looked up the menu item via the signupCtrl.hasValidMenuItem() validation.
		// So now we just need to set the message to update the UI.
		signupCtrl.dataSavedMessage = hasValidMenuItem ? successMessage : errorMessage;
	};
}

})();
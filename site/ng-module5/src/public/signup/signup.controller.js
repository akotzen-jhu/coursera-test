(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['RegistrationService'];
function SignupController(RegistrationService) {

	var signupCtrl = this;
	var foundMenuItem = {};
	var successMessage = 'Your information has been saved.';
	var errorMessage = 'There was a problem saving your information.';

	signupCtrl.dataSavedMessage = '';
	signupCtrl.enableMyInfoLink = false;

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

	signupCtrl.hasValidMenuItem = false;

	signupCtrl.validateMenuItem = function() {

		signupCtrl.hasValidMenuItem = false;
		console.log('signupCtrl.validateMenuItem starting');

		// Ensure the textfield has data in it.
		var shortName = signupCtrl.registration.menuItem.shortName || '';
		console.log('shortName', shortName);

		if (shortName.length === 0) {
			signupCtrl.hasValidMenuItem = false;
			foundMenuItem = {};
			return;
		}

		console.log('looking up menu items');

		// We have not looked up the menu item. Look it up using the service.
		var promise = RegistrationService.lookupMenuItem(signupCtrl.registration.menuItem.shortName);
		promise.then(function(response) {

			console.log('in promise');

			var menuItem = response.data;
			console.log('menuItem', menuItem);

			if (RegistrationService.hasValidMenuItem === true) {
				RegistrationService.updateRegistrationData(signupCtrl.registration);
				foundMenuItem = menuItem;
				signupCtrl.hasValidMenuItem = true;
			}
		});
	}

	signupCtrl.saveRegistration = function() {

		console.log('saveRegistration');

		// We have already looked up the menu item via the signupCtrl.hasValidMenuItem() validation.
		// So now we just need to set the message to update the UI.
		signupCtrl.dataSavedMessage = signupCtrl.hasValidMenuItem ? successMessage : errorMessage;
		signupCtrl.enableMyInfoLink = signupCtrl.hasValidMenuItem;
	};
}

})();
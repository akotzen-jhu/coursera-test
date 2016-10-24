describe('menuItemTests', function () {

  var registrationService;
  var $httpBackend;
  //var ApiBasePath;

  var endpoint = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=A';

  beforeEach(function () {
    module('public');
    // module('public', ['ui.router', 'common']);

    inject(function ($injector) {
      registrationService = $injector.get('RegistrationService');
      $httpBackend = $injector.get('$httpBackend');
      //ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should find the menu item (A1) in the result set', function() {

    var response = [
      {short_name: "A1"},
      {short_name: "A2"},
      {short_name: "A3"},
    ];

    $httpBackend.whenGET(endpoint).respond(response);
    registrationService.lookupMenuItem('A1').then(function(response) {
      expect(response.data).toContain(jasmine.objectContaining({short_name: "A1"}))
    });
    $httpBackend.flush();
  });

  it('should not find the menu item (A5) in the result set', function() {

    var response = [
      {short_name: "A1"},
      {short_name: "A2"},
      {short_name: "A3"},
    ];

    $httpBackend.whenGET(endpoint).respond(response);
    registrationService.lookupMenuItem('A5').then(function(response) {
      expect(response.data).not.toContain(jasmine.objectContaining({short_name: "A5"}))
    });
    $httpBackend.flush();
  });

});

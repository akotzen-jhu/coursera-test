describe('menuItemTests', function () {

  var registrationService;
  var $httpBackend;

  beforeEach(function () {
    module('public');
    // module('public', ['ui.router', 'common']);

    inject(function ($injector) {
      registrationService = $injector.get('RegistrationService');
      $httpBackend = $injector.get('$httpBackend');
      //ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  it('should equal', function() {
    expect(1).toEqual(1);
  });

  it('should find the menu item (A1) in the result set', function() {

    var endpoint = 'http://akotzen1-menu.herokuapp.com/menu_items/A1.json';
    var response = {
      data: { short_name: "A1" }
    };

    $httpBackend.whenGET(endpoint).respond(response);
    registrationService.lookupMenuItem('A1').then(function(response) {
      expect(response.data).toContain(jasmine.objectContaining({short_name: "A1"}))
    });
    $httpBackend.flush();
  });

  it('should not find a menu item in the result set', function() {

    var endpoint = 'http://akotzen1-menu.herokuapp.com/menu_items/A99.json';
    var response = {
      data: { status: "500", error: "Internal Server Error"}
    };

    $httpBackend.whenGET(endpoint).respond(response);
    registrationService.lookupMenuItem('A99').then(function(response) {
      expect(response.data).not.toContain(jasmine.objectContaining({short_name: "A99"}))
    });
    $httpBackend.flush();
  });

});

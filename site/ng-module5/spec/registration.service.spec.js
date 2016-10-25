describe('registrationService', function () {

  var registrationService;
  var $httpBackend;

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      registrationService = $injector.get('RegistrationService');
      $httpBackend = $injector.get('$httpBackend');
    });
  });

  it('should ensure jasmine is up and running', function() {
    expect(1).toEqual(1);
  });

  it('should find menu item (A1) in the response', function() {

    var endpoint = 'https://akotzen1-menu.herokuapp.com/menu_items/A1.json';
    var mockResponse = { 
      id: 1, 
      short_name: "A1", 
      name: "Won Ton Soup with Chicken" 
    };

    $httpBackend.whenGET(endpoint).respond(mockResponse);

    registrationService.lookupMenuItem('A1').then(function(response) {
      expect(response.data.short_name).toEqual('A1')
    });

    $httpBackend.flush();
  });

  it('should generate internal server error for invalid menu item (A99)', function() {

    var endpoint = 'https://akotzen1-menu.herokuapp.com/menu_items/A99.json';
    var mockResponse = { status: "500", error: "Internal Server Error" };

    $httpBackend.whenGET(endpoint).respond(mockResponse);

    registrationService.lookupMenuItem('A99').then(function(response) {
      expect(response.data.status).toEqual('500');
    });

    $httpBackend.flush();
  });

});

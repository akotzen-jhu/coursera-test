(function () {

angular.module('MenuApp',['ui.router']);

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'src/home.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories.html'
    })

    .state('items', {
      url: '/items/{itemId}',
      templateUrl: 'src/items.html'
    });
}


})();

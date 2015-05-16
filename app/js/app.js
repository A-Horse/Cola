angular.module('coffee', ['ui.router', 'textAngular', 'coffee.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
              url: '/dash',
              templateUrl: 'templates/dash.html',
              controller: 'DashCtrl'
            })
        .state('css', {
          url: '/css',
          templateUrl: 'templates/css.html',
          controller: 'CssCtrl'
        })
        .state('css', {
          url: '/css',
          templateUrl: 'templates/css.html',
          controller: 'CssCtrl'
        });
        $urlRouterProvider.otherwise('/dash');
    });
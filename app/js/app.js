angular.module('coffee', ['ui.router', 'textAngular', 'coffee.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dash', {
              url: '/dash',
              templateUrl: 'templates/dash.html',
              controller: 'DashCtrl'
            })
        .state('editor', {
          url: '/editor',
          templateUrl: 'templates/editor.html',
          controller: 'EditCtrl'
        });
        $urlRouterProvider.otherwise('/dash');
    });
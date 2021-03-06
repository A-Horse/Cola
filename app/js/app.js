angular.module('cola', [
  'ui.router',
  //'ngAnimate',
  'cola.controllers'])
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
        .state('component', {
          url: '/component',
          templateUrl: 'templates/component.html',
          controller: 'ComponentCtrl'
        })
        .state('color', {
          url: '/color',
          templateUrl: 'templates/color.html',
          controller: 'ColorCtrl'
        })
        .state('font', {
          url: '/font',
          templateUrl: 'templates/font.html',
          controller: 'FontCtrl'
        })
        .state('javascript', {
          url: '/js',
          templateUrl: 'templates/javascript.html',
          controller: 'JavascriptCtrl'
        })
        .state('test', {
          url: '/test',
          templateUrl: 'templates/test.html',
          controller: 'TestCtrl'
        });
        $urlRouterProvider.otherwise('/dash');
    });
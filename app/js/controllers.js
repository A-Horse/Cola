angular.module('cola.controllers', [])

    .controller('DashCtrl', function($scope) {

    })

    .controller('CssCtrl', function($scope) {

    })

    .controller('FontCtrl', function($scope) {

    })

    .controller('ColorCtrl', function($scope) {

    })

    .controller('ComponentCtrl', function($scope) {

    })

    .controller('JavascriptCtrl', function($scope) {

      $scope.dialogs1click = function() {

          cola.dialogs({
            text: 'fuck me!'
          }, {
            type: 'normal'
          });

      };

    })

    .controller('TestCtrl', function($scope) {

    });
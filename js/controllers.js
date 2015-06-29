angular.module('cola.controllers', [])

    .controller('DashCtrl', function($scope) {

    })

    .controller('CssCtrl', function($scope, $location, $anchorScroll) {
      $scope.gotoThere = function(target) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(target);

        // call $anchorScroll()
        $anchorScroll();
      };
    })

    .controller('FontCtrl', function($scope) {

    })

    .controller('ColorCtrl', function($scope) {

    })

  .controller('ComponentCtrl', function($scope, $location, $anchorScroll) {
    $scope.gotoThere = function(target) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(target);

      // call $anchorScroll()
      $anchorScroll();
    };
    })

  .controller('JavascriptCtrl', function($scope, $location, $anchorScroll) {
    $scope.gotoThere = function(target) {
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash(target);

      // call $anchorScroll()
      $anchorScroll();
    };

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

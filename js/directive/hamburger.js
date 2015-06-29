angular.module('cola')
    .directive('hamburgerButton', function() {
        'use strict';

        return {
            restrict: 'E', // only activate on element attribute
            link: function(scope, elem) {

                // watch own value and re-validate on change
                elem.on('click', function(){

                  this.nextElementSibling.classList.toggle('menu-on');

                  var child = this.childNodes[1].classList;

                  if (child.contains('active')) {


                    if(child.contains('active-end')){
                      child.remove('active');
                      child.remove('active-end');
                      child.add('active');
                    } else {
                      child.add('active-end');
                    }


                  } else {
                    child.add('active');
                  }

                });
            }
        };
    });
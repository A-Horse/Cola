angular.module('cola').
  directive('ngPin', function($http, $q, $timeout) {
  'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {

          var calcLimit = function(){
            var $this = $(element);
            var $parent =$this.parent();
            var $container;
            if(attrs.container) {
              $container = $(attrs.container);
            } else {
              $container = $parent;
            }

            var offset = $this.offset();
            var containerOffset = $container.offset();
            var parentOffset = $parent.offset();


            if(!$this.parent().is('.pin-wrapper')) {
              $this.wrap('<div class="pin-wrapper">');
            }

            var pad = $.extend({
              top: 0,
              bottom: 0
            },  {});


            $this.data('pin', {
              pad: pad,
              from: containerOffset.top - pad.top,
              to: containerOffset.top + $container.height() - $this.outerHeight() - pad.top,
              end: containerOffset.top + $container.height(),
              parentTop: parentOffset.top
            });
            $this.css({width: $this.outerWidth()});
            $this.parent().css("height", $this.outerHeight());
          };


         var onScroll = function(){

           var scrollY = $(window).scrollTop();

           var $this = $(element);
           var data = $this.data('pin');
           if(!data){return ;};
           var from = data.from - data.pad.bottom,
               to = data.to - data.pad.top;

           if (from + $this.outerHeight() > data.end) {
             $this.css('position', '');
           }

           if (from < scrollY && to > scrollY) {
             !($this.css("position") == "fixed") && $this.css({
               left: $this.offset().left,
               top: data.pad.top
             }).css('position', 'fixed');

           } else if (scrollY >= to) {
             $this.css({
               left: '',
               top: to - data.parentTop + data.pad.top
             }).css("position", "absolute");

                  } else {
             $this.css({position: "", top: "", left: ""});

           }

         };

          var update = function () { calcLimit(); onScroll(); };
          $(window).scroll(onScroll);
          $(window).resize(function () { calcLimit(); });
          //calcLimit();



          $(element).load(function() {
            calcLimit();
          });
          $timeout(function(){
            calcLimit();
          }, 1000);

        }
    };
});

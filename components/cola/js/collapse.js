  +function( cola ){
    'use strict';

    var Collapse = Collapse || {};
    var $$ = document.querySelectorAll.bind(document);

    Collapse.getTarget = function( e ) {
      var element = null,
          target = e.target || e.srcElement;

      if ( target.dataset.toggle  === 'collapse' ) {

        return target;

      } else {

        return null;

      }

    };

    Collapse.dropdown = function( e ) {

      var element = this.getTarget( e );
      if ( element && element.dataset.target ) {

        var target = document.getElementById( element.dataset.target );
        if( target ) {

          if (target.classList.contains( 'on' ) ) {

            target.classList.remove('on');

          } else {

            target.classList.add( 'on' );

          }

        }

      }

    }.bind(Collapse);

    Collapse.on = function() {

      document.body.addEventListener( 'click', this.dropdown, false );

    };



    cola.collapse = Collapse;

    document.addEventListener('DOMContentLoaded', function() {
      Collapse.on();
    }, false);

  }( cola );
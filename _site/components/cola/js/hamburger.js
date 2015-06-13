(function() {

    'use strict';

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    // var toggle = function() {
    //     var child;
    //     //document.body.classList.toggle('background--blur');
    //     this.parentNode.nextElementSibling.classList.toggle('menu-on');

    //     // child = this.childNodes[1].classList;

    //     // if (child.contains('hamburger-icon-to-arrow')) {
    //     //   child.remove('hamburger-icon-to-arrow');
    //     //   child.add('hamburger-icon-from-arrow');
    //     // } else {
    //     //   child.remove('hamburger-icon-from-arrow');
    //     //   child.add('hamburger-icon-to-arrow');
    //     // }

    // };

    var onetime = function(node, type, callback) {
        var oneFn = function(e) {
            e.target.removeEventListener(e.type, oneFn);
            // call handler
            return callback(e);
        };

        node.addEventListener(type, oneFn);
    };

    var toggle = function(e) {

        this.parentNode.nextElementSibling.classList.toggle('menu-on');

        var child = this.classList;
        if (child.contains('active')) {
            if (child.contains('active-end')) {
                child.remove('active');
                child.remove('active-end');
                child.add('active');
            } else {
                child.add('active-end');
            }


        } else {
            child.add('active');
        }
    };


    var observer = new MutationObserver(function(mutations, observer) {
        // fired when a mutation occurs
        var hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.removeEventListener('click', toggle);
            hamburger.addEventListener('click', toggle);
        }



    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
        subtree: true,
        attributes: true
            //...
    });

})();
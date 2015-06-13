(function() {
    'use strict';

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {


    });

    observer.observe(document, {
        subtree: true,
        attributes: true

    });



})();
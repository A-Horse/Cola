(function() {

  'use strict';

  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var toggle = function() {
    var child;
    //document.body.classList.toggle('background--blur');
    this.parentNode.nextElementSibling.classList.toggle('menu-on');

    // child = this.childNodes[1].classList;

    // if (child.contains('hamburger-icon-to-arrow')) {
    //   child.remove('hamburger-icon-to-arrow');
    //   child.add('hamburger-icon-from-arrow');
    // } else {
    //   child.remove('hamburger-icon-from-arrow');
    //   child.add('hamburger-icon-to-arrow');
    // }

  };

  var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    console.log(mutations, observer);

    var hamburgerIcon = document.querySelector('.hamburger-icon');
    if(hamburgerIcon){
      hamburgerIcon.removeEventListener('click', toggle);
      hamburgerIcon.addEventListener(
        'click', toggle);
    }


  });

  // define what element should be observed by the observer
  // and what types of mutations trigger the callback
  observer.observe(document, {
    subtree: true,
    attributes: false
    //...
  });

})();

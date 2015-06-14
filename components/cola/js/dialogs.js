+function( cola ) {
  'use strict';

  cola.dialogs = function ( msg, opt ) {

    if ( msg.text && opt ) {

      var dialogs = document.createElement('div'),
          text = document.createElement('p');

      text.innerHTML = msg.text;
      dialogs.classList.add('dialogs');

      if ( opt.type === 'normal' ) {
        dialogs.classList.add('normal');
      }

      dialogs.appendChild(text);
      document.body.appendChild(dialogs);

      setTimeout(function(){
        dialogs.classList.add('out');
        document.body.removeChild(dialogs);
      }, 1000);

    } else {

      throw 'Dialogs params error!';

    }

  };

}( cola );
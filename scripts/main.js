require.config({
  paths: {
    "text": "lib/text",
    "Ractive": "lib/Ractive",
    "Ractiveevents-tap": "lib/Ractive-events-tap",
    "rv": "lib/rv",
    "json": "lib/json"
  }
});

require([ 'Ractive', 'Ractiveevents-tap', 'rv!templates/main', 'rv!templates/navlist', 'json!/hapi/hello' , 'json!/hapi/navlist' ],
  function ( Ractive, Ractivetap, mainTmpl, navListTmpl, hapihello, hapinavlist ) {

  // create the hello world greeting based on the hapi hello backend
  var greet = new Ractive({
    el: 'container',
    template: mainTmpl,
    data: hapihello
  });
  // attach a listener to the New greeting! button
  listener = greet.on({
    getgreet: function () {
      xhr = new XMLHttpRequest();
      xhr.open( 'get', '/hapi/hello' );
      xhr.onload = function () {
        var data = JSON.parse( xhr.responseText );
        greet.set({
          greeting: data.greeting,
          recipient: data.recipient,
          language: data.language
        });
      };
      xhr.send();
    }
  });

  // use the json object retrieved from the hapi to show a list of links in the navigation
  var navlist = new Ractive({
    el: 'target',
    template: navListTmpl,
    data: {
      navItems: hapinavlist
    }
  });
});

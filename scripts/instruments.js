require.config({
  paths: {
    "Ractive": "lib/Ractive",
    "text": "lib/text",
    "rv": "lib/rv",
  }
});

require([ 'Ractive', 'rv!templates/project/instrument' ],
  function ( Ractive, instrumentTmpl ) {
    var instrumentlist;

    xhr = new XMLHttpRequest();
    xhr.open( 'get', '/hapi/products' );
    xhr.onload = function () {
      instrumentlist = JSON.parse( xhr.responseText );
      // console.log(data);
      ractive.set({
        instruments: instrumentlist
      });
    };
    xhr.send();

  var ractive = new Ractive({
    el: output,
    template: instrumentTmpl
  });

  ractive.on(
    'activate', function ( event ) {
      var name = prompt( 'Enter the name of the instrument', '' );
      if (name) {
        xhr = new XMLHttpRequest();
        xhr.open( 'post', '/hapi/products' );
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          var data = JSON.parse( xhr.responseText );
          instrumentlist.push( data[0].product );
        };
        xhr.send("name=" + name);
      }
    }
  );
  ractive.on(
    'remove', function ( event ) {
      if (confirm( 'Really remove?')) {
        xhr = new XMLHttpRequest();
        xhr.open( 'post', '/hapi/products/delete' );
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
          var data = JSON.parse( xhr.responseText ),
          index = 0;

          instrumentlist.map(function (instrument) {
            if (instrument.id == data[0].product_id ) {
              position = index;
            }
            index++;
          });
          if ( ~position ) instrumentlist.splice(position, 1);

        };
        xhr.send("id=" + event.context.id);
      }
    }
  );

});

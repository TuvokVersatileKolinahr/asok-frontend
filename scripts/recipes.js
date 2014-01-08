require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.10.2.min",
    "text": "lib/text",
    "Ractive": "lib/Ractive",
    "rv": "lib/rv",
    "json": "lib/json"
  }
});

/* http://asok.tuvok.nl/hapi/recipes */
require([ 'Ractive', 'rv!templates/recipes', 'json!/hapi/recipes', 'jquery' ],
  function ( Ractive, recipeTmpl, hapirecipes, $ ) {

console.log("hapirecipes", hapirecipes);
  var greet = new Ractive({
    el: 'container',
    template: recipeTmpl,
    data: hapirecipes
  });
});

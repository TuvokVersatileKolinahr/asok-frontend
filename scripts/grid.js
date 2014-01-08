require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.10.2.min",
    "text": "lib/text",
    "Ractive": "lib/Ractive",
    "rv": "lib/rv",
    "json": "lib/json",
    "fw": "lib/freewall"
  },
  shim: {
    "fw": ["jquery"]
  }
});

require([ 'Ractive', 'fw', 'rv!templates/gridList', 'json!../images.json', 'jquery' ],
  function ( Ractive, fw, gridListTmpl, imagesData, $ ) {

  console.log("images", imagesData.collections[0]);
  var dir = imagesData.collections[0].basedir + "/" + imagesData.collections[0].collectiondir;
  var list = imagesData.collections[0].imagelist;
  var navlist = new Ractive({
    el: 'freewall',
    template: gridListTmpl,
    data: {
      collectionData: list,
      collectionDir: dir
    }
  });

  var wall = new freewall("#freewall");
    wall.reset({
      selector: '.cell',
      animate: true,
      cellW: 20,
      cellH: 200,
      onResize: function() {
        wall.fitWidth();
      }
    });

    wall.fitWidth();
    // for scroll bar appear;
    $(window).trigger("resize"); 

});

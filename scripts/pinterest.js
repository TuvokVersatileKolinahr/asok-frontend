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

require([ 'Ractive', 'fw', 'rv!templates/pinterestList', 'json!../images.json', 'jquery' ],
  function ( Ractive, fw, pinterestListTmpl, imagesData, $ ) {

  console.log("images", imagesData.collections[0]);
  var dir = imagesData.collections[0].basedir + "/" + imagesData.collections[0].collectiondir;
  var list = imagesData.collections[0].imagelist;
  var navlist = new Ractive({
    el: 'freewall',
    template: pinterestListTmpl,
    data: {
      collectionData: list,
      collectionDir: dir
    }
  });


    var wall = new freewall("#freewall");
    wall.reset({
      selector: '.brick',
      animate: true,
      cellW: 200,
      cellH: 'auto',
      onResize: function() {
        wall.fitWidth();
      }
    });
    var images = wall.container.find('.brick');
    var length = images.length;
    images.css({visibility: 'hidden'});
    images.find('img').load(function() {
      -- length;
      if (!length) {
        setTimeout(function() {
          images.css({visibility: 'visible'});
          wall.fitWidth();
        }, 505);
      }
    });
  // setTimeout(function (){ console.log("recalculate"); wall.fitWidth() }, 5000);

});

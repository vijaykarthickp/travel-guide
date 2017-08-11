$(function(){

  String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
  }

  $.fn.btnClick = function(season, title) {

    let seasonCap = season.capitalize();
    console.log(seasonCap);
    console.log(title);

    if(document.getElementById(title).src === 'http://localhost:3000/assets/img/icons-heart.png'){
      document.getElementById(title).src="../../assets/img/icons-heart-filled.png";
      $(`#${seasonCap}-count`).html(function(i, val) { return +val+1 });
    }else{
      $(`#${seasonCap}-count`).html(function(i, val) { return val-1 });
      document.getElementById(title).src="../../assets/img/icons-heart.png";
    }
  }
  $(document).ready(function(){

    if($('body').hasClass('spring')){
      var engine = new RainyDay({
        image: document.getElementById('background-img'),         // Image element
                                // This value is required
        parentElement: document.getElementById('header-parent'), // Element to be used as a parent for the canvas
                                // If not provided assuming the 'body' element
        // crop: [500, 500, 500, 500],   // Coordinates if only a part of the image should be used
                                // If not provided entire image will be used
        blur: 10,               // Defines blur due to rain effect
                                // Assuming 10 if not provided
                                // Use 0 value to disable the blur
        opacity: 1              // Opacity of rain drops
                                // Assuming 1 if not provided
    });
    engine.rain(
        [
            [1, 0, 20],         // add 20 drops of size 1...
            [3, 3, 1]           // ... and 1 drop of size from 3 - 6 ...
        ],
        100);                   // ... every 100ms
    }

  });

});

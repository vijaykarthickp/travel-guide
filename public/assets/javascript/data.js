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

  // $('#summer').click(function(){
  //   console.log("BTN CLICKED");
  //   // $('#fav-img').attr('src', '../../assets/img/icons-heart-filled.png');
  //   // $('#summer')
  //   $('#Summer-count').html(function(i, val) { return +val+1 });
  // });
  // $('#spring').click(function(){
  //   console.log("BTN CLICKED");
  //   // $('#fav-img').attr('src', '../../assets/img/icons-heart-filled.png');
  //
  // });
  // $('#winter').click(function(){
  //   console.log("BTN CLICKED");
  //   // $('#fav-img').attr('src', '../../assets/img/icons-heart-filled.png');
  //
  // });
  // $('#autumn').click(function(){
  //   console.log("BTN CLICKED");
  //   // $('#fav-img').attr('src', '../../assets/img/icons-heart-filled.png');
  //
  // });
});

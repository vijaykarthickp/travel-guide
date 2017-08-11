(function($) {
  $(document).ready(function() {
   $('.filters-check').one('click', function(e) {
     console.log($(e.target));
     $(e.target).toggleClass('active');
     var filters = '';
     var seasons = '';
     $('.filters-check.active').each(function() {
       filters+= $(this).val() + ',';
     });
     $('.season-check.active').each(function() {
       seasons+= $(this).val() + ',';
     });
     //filters = filters.substring((filters.length -1), filters.length);
     window.location = window.location.origin + window.location.pathname + '?filters='+ filters + '&seasons=' +seasons ;
   });
   $('.season-check').one('click', function(e) {
     console.log($(e.target));
     $(e.target).toggleClass('active');
     var filters = '';
     var seasons = '';
     $('.season-check.active').each(function() {
       seasons+= $(this).val() + ',';
     });
     $('.filters-check.active').each(function() {
       filters+= $(this).val() + ',';
     });
     //filters = filters.substring((filters.length -1), filters.length);
     window.location = window.location.origin + window.location.pathname + '?filters='+ filters + '&seasons=' +seasons ;
   });
  });
})(jQuery);

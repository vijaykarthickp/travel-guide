(function($) {
  $(document).ready(function() {
   $('.filters-check').one('click', function(e) {
     console.log($(e.target));
     $(e.target).toggleClass('active');
     var filters = '';
     $('.filters-check.active').each(function() {
       filters+= $(this).val() + ',';
     });
     //filters = filters.substring((filters.length -1), filters.length); 
     window.location = window.location.origin + window.location.pathname + '?filters='+ filters;
   });
  });
})(jQuery);

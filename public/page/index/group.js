define(function  (require,exports,module) {
	require('./common');

	var offsetTop = $('.app-wrapper').offset().top;

	$(function  () {
	  $(window).scroll(function  () {
	    var top = $(this).scrollTop();

	    if ($('.app-wrapper')[0]) {
	      if (top>=offsetTop) {
	        $('.app-wrapper').addClass('app-fixed');
	      } else{
	        $('.app-wrapper').removeClass('app-fixed');
	      }
	    }
	  });
	})
})
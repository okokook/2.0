define(function  (require,exports,module) {
	$(function  () {
		$('body').append('<div class="go-top_wrapper"><a href="" class="go-top" title="返回顶部"></a></div>');
		$(window).scroll(function  () {
			var top = $(this).scrollTop();
			if (top>=600) {
				$('.go-top_wrapper').show();
			} else{
				$('.go-top_wrapper').hide();
				}
		});

		$('.go-top').click(function  (ev) {
			ev.preventDefault();
			$('html,body').animate({scrollTop:0},400);
		})
	})
})
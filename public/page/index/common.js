define(function  (require,exports,module) {
	require('goTop');
	require('cardFace');
	$(function  () {
		$('.login-popup').click(function (e){
			e.preventDefault();
			require.async('login',function (login){
				login.init();
			})
		});
	})

})
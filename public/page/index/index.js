define(function  (require,exports,module) {
	require('common');
	var bxSlider = require('bxslider');

	function setCookie(c_name,value,expiredays)
	{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}

	setCookie('loginState',1,123);

	$(function  () {
	
			//轮播图片函数
		 $('.bxslider').bxSlider({
		 	auto:'auto',
		 	mode:'fade'
		 });
		$('.newfeed-list').bxSlider({
		 	mode:'vertical',
		 	auto:true,
		 	slideWidth:258,
		 	slideMargin:16,
		 	minSlides:3,
	  		maxSlides: 3,
	  		moveSlides: 1,
	  		controls:false,
	  		pager:false,
	  		pause:6000
		 });

		$('.emotion').each(function  () {
			$(this).qqFace({
				id : 'facebox', //表情盒子的ID
				assign:'con-wrapper', //给那个控件赋值
			});
		})


	})
})
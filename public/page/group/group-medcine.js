define(function  (require,exports,module) {
	require('./common');
	var dialog = require('dialog');

	var	data = {};

	
	
	//检查是否登陆 用cookie防止其它页登出本页不响应
	function isLogin () {
		var loginstate=document.cookie.match(/(?:;|^)\s*loginState=([^;])/);
		return loginstate&&loginstate[1]&&loginstate[1]!="0";
	}
	
	function quickDialog (con) {
			var  d = dialog({content:con});
			d.show();
			setTimeout(function  () {
				d.close().remove();
			},1000)
		}
	(function  ($) {
		$.fn.star=function  () {
			isStar={effect:false,
					safety:false,
					price:false};
			var isClick = false,
				hint=' ',
				starIndex='xy';
			this.hover(function(){
			$(this).parent('.inp-score').find('.warn').hide();
			$(this).addClass('active');
			$(this).parent('.inp-score').find('.hint').html($(this).attr('title'));		
			isClick = false;
		},function(){
			if (isClick==true) {return}
			$(this).removeClass('active');
			if (starIndex !='xy') {$(this).parent('.inp-score').find('a').eq(starIndex).addClass('active');}
			$(this).parent('.inp-score').find('.hint').html(hint);
		});
		
			this.click(function(){
			event.preventDefault();
			var type=$(this).parent().parent().attr('class');
			isStar[type] = true ;
			hint = $(this).attr('title');
			starIndex = $(this).index();
			$(this).parent('.inp-score').find('a').removeClass('active');
			$(this).addClass('active');
			isClick = true;
		});
		}
	})(jQuery);

	// 动态百分比
		$('.medicine .percent').each(function() {
			var percent=$(this).attr('number');
			$(this).animate({width:percent}, 400);

		});

	//星星打分
		$('.med-score .effect a').star();
		$('.med-score .safety a').star();
		$('.med-score .price a').star();

	$(function  () {
		$(document)
		.on('click','.submit a',function  (e) {
			e.preventDefault();
			if (isLogin()) {
				data.liaoxiaoval = $(".effect .active").text();;
				data.fuzuyongval = $(".safety .active").text();
				data.jiageval = $(".price .active").text();
				data.comment = $("#b_comment").val();
				if (checkcomm(data)) {
					$.getJSON('test',{'data':data}).done(function  () {
						var html = htmltpl(data);
						$('.group-comment .bd ul').prepend(html);
						$('.inp-score .active').removeClass('active');
						$('.hint').text(' ');
						$('#b_comment').val(' ');
						addUsed();
					})
				}

			} else{
				require.async('login',function (login){
					login.init();
				})
			}
		})
		/*.on('click','.use',function  (e) {
			e.preventDefault();
			var $ele = $(this);
			var text = $ele.find('span').text();
			var id = $ele.data('id');
			if (text=='用过') {
				$.getJSON('test',{'id':id}).done(function  () {
					$plus="+1";
					$ele.find('.plus').text($plus).fadeIn().fadeOut();
					$ele.find('span').text('已用过');
					addUsed();
				})

			}
		});*/
	})

	function htmltpl (data) {
		var html = '';
		html+='<li>';
		html+='<div class="pic"><a href="'+OP_CONFIG.user_link+'">';
		html+='<img src="'+OP_CONFIG.user_pic+'">';
		html+='</a></div>';
		html+='<div class="detail">';
		html+='<div class="name"><a href="http://www.manyoubang.com/user-space-id-19454.html">'+OP_CONFIG.user_name+'</a></div>';
		html+='<div class="score">疗效:<span class="number">'+data.liaoxiaoval+'</span>安全度:<span class="number">'+data.fuzuyongval+'</span>性价比:<span class="number">'+data.jiageval+'</span></div>';
		html+='<div class="con">'+data.comment+'</div>';
		html+='</div></li>';

		return html;
	}

	function checkcomm(data){
		if (data.liaoxiaoval == "") {
			quickDialog("请先为药物疗效打分！");
			return false;
		}
		if (data.fuzuyongval == "") {
			quickDialog("请先为药物安全度打分！");
			return false;
		}
		if (data.jiageval == "") {
			quickDialog("请先为药物价格打分！");
			return false;
		}

		if (data.comment=="请输入信息") {
			quickDialog('请输入评价信息！')
			return false;
		}
		if (data.comment == "" || data.comment.length<4 ) {
			quickDialog("评价内容不能少于4个字!");
			return false;
		}

		return true;
	}
	function  addUsed() {
		var html="";
		html +='<li><a href="'+OP_CONFIG.user_link+'"><img src="'+OP_CONFIG.user_pic+'"></a><div class="name" title="'+OP_CONFIG.user_name+'">'+OP_CONFIG.user_name+'</div></li>';
		$('.member ul').prepend(html);
	}
})



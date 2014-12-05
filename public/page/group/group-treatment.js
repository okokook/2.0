define(function  (require,exports,module) {
	require('./common');
	var dialog = require('dialog'),
		data = {};
		data.helpval="有帮助";

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
	

	$(function  () {

		$('.therapy .help .item').click(function(event) {
				$('.therapy .help .item').removeClass('cur');
				$(this).addClass('cur');
				data.helpval=$(this).text();
			});
			$('.therapy .time-wrapper').click(function(event) {
				event.preventDefault();
				$(this).addClass('cur');
				$('.dropdown').slideDown();
				return false;
			});
			$('.therapy .dropdown a').hover(function() {
				$(this).addClass('active')
			}, function() {
				$(this).removeClass('active')
			});
			$('.therapy .dropdown a').click(function(event) {
				event.preventDefault();
				change = true;
				$('.therapy .warn').hide();
				$('.therapy .time-wrapper span').text($(this).text());
				data.timeval = $(this).text();// m
				$('.therapy .dropdown').slideUp();
				$('.therapy .time-wrapper').removeClass('cur');
				return false;
			});

		$(document)
		.on('click','.submit a',function  (e) {
			e.preventDefault();
			var comment = $("#b_comment").val();
			data.comment = comment;
			if (checkcomm(data)) {
				$.getJSON('test',{'data':data}).done(function  () {
					var html = htmltpl(data);
					$('.group-comment .bd ul').prepend(html);
					$('#b_comment').val(' ');
					addUsed();
				})
			}

		})
	})

	function htmltpl (data) {
		var html = '';
		html+='<li>';
		html+='<div class="pic"><a href="'+OP_CONFIG.user_link+'">';
		html+='<img src="'+OP_CONFIG.user_pic+'">';
		html+='</a></div>';
		html+='<div class="detail">';
		html+='<div class="name"><a href="'+OP_CONFIG.user_link+'">'+OP_CONFIG.user_name+'</a></div>';
		html+='<div class="effect"><span class="help">'+data.helpval+'</span>使用&nbsp;:&nbsp;<span class="time">'+data.timeval+'</span></div>';
		html+='<div class="con">'+data.comment+'</div>';
		html+='</div></li>';

		return html;
	}

	
	function checkcomm(data){

		if (data.timeval == undefined) {
			quickDialog("请选择使用时间！");
			return false;
		}

		if (data.comment=="请输入信息") {
			quickDialog("请输入信息")
			return false;
		}

		if (data.comment == "" || data.comment.length<4 ) {
			quickDialog("评价内容不能少于4个字!");
			return false;
		}

		return true

	}
	function  addUsed() {
		var html="";
		html +='<li><a href="'+OP_CONFIG.user_link+'"><img src="'+OP_CONFIG.user_pic+'"></a><div class="name" title="'+OP_CONFIG.user_name+'">'+OP_CONFIG.user_name+'</div></li>';
		$('.member ul').prepend(html);
	}
})



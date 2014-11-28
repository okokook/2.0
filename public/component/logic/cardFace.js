define(function  (require,exports,module) {

	var 
	isIncard = 0,
	dialog = require('dialog'),
	qqFace = require('qqFace'),
	template = require('template');

	function cardShow (data) {
		d = dialog({
				skin:'cardFace',
				align:'bottom left',
				width:300,
				content:data.con
			});
		d.show(data.ele);
	}

	//私信

	function showsendmsg(tid,user){
		var str ="有什么要对"+user+"说:"
		var html = "<div class='edit-box_wrapper send-msg-wrapper'><textarea style='width:480px;height:80px;padding:10px;' class='con-wrapper'></textarea><div class='quick-submit_wrapper'><a href='javascript:;' class='add-smile emotion'></a></div></div>";
		var d = dialog({
			skin:"my-post post-item",
    		title: str,
    		content: html,
			ok: function () {
				var con = $('.send-msg-wrapper .con-wrapper').val();
		       $.getJSON('test',{tid:tid,con:con}).done(function  (data) {
		       	d.close();
		       	quickTip('私信已发出');
		       });
		    },
		    okValue:'发出',
		    cancelValue: '取消',
    		cancel: function () {}
			});
			d.show();
	}

	//init emotion
	function initEmotion () {
		$('.emotion').each(function  () {
			$(this).qqFace({
				id : 'facebox', //表情盒子的ID
				assign:'con-wrapper', //给那个控件赋值
			});
		})
	}


	$(function  () {

		$(document)
		.on('mouseenter','.cardInfo',function  () {
				var id = $(this).data('id');
				var data = {};
				data.ele = this;
				data.con = template('faceCard_template');
				card = setTimeout(function  () {
					$.getJSON('test5',{id:id}).done(function  (d) {

						data.con = template('faceCard_template',d);
					})
					cardShow(data);
				},500);
		})
		.on('mouseleave','.cardInfo',function  () {
			setTimeout(function  () {
				if (isIncard) {
					return;
				}
				d.close().remove();
				isIncard = 0;
			},500)
			clearTimeout(card);
		})
		.on('mouseenter','.cardFace',function  () {
			isIncard = 1;
		})
		.on('mouseleave','.cardFace',function () {
			clearTimeout(card);
			d.close().remove();
			isIncard = 0;
		})
		.on('click','.removeFriend',function  (e) {
			e.preventDefault();

			var $ele = $(this),
				id = $ele.data('id');

			$.getJSON('test5',{id:id}).done(function  () {
				$ele.closest('.followed').removeClass('followed').addClass('follow');
			})
		})
		.on('click','.addFriend',function  (e) {
			e.preventDefault();

			var $ele = $(this),
				id = $ele.data('id');

			$.getJSON('test1',{id:id}).done(function  () {
				$ele.closest('.follow').removeClass('follow').addClass('followed');
			})
		})
		.on('click','.send-msg',function  () {
			var id =$(this).data('id');
			var user = $(this).closest('.cardFace').find('.name').text();
			showsendmsg(id,user);
			initEmotion();

		})
	})
	
})
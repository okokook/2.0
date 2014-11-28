define(function(require, exports, module){
	var dialog = require('dialog');
	function quickdialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000)
	}
	$('.save').click(function  (e) {
		e.preventDefault();
		var data ={};
		data.notice=[];
		$('input[type="checkbox"]:checked').each(function  () {
			data.notice.push($(this).val());
		});
		data.comment=$('input[name="comment-allowed"]:checked').val();
		data.private=$('input[name="private"]:checked').val();
		console.log(data);
		$.getJSON('test',data).done(function  () {
			quickdialog('保存成功');
		}).fail(function  () {
			quickdialog('后台保存失败，请重试');
		})
	})
})

define(function  (require,exports,module) {
	var dialog = require('dialog');
	var isAjax = 0;
	function quickdialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function () {
			 d.close().remove();
		},1000);
	}
	$(function () {
		$('.submit').click(function  (e) {
				e.preventDefault();
				if (isAjax == 1) {
					return;
				}
				var data ={};
				data.comment=$('input[name="comment-allowed"]:checked').val();
				data.at=$('input[name="@-allowed"]:checked').val();
				data.remind=$('input[name="remind-allowed"]:checked').val();
				data.newfans=$('input[name="newfans-allowed"]:checked').val();
				data.notice=$('input[name="notice-allowed"]:checked').val();
				data.chat=$('input[name="chat-allowed"]:checked').val();
				data.group=$('input[name="group-allowed"]:checked').val();

				$('.submit').val('保存中..');
				isAjax = 1;
				$.ajax({
					url:"test",
					data:data,
					dataType:"json",
					method:"post",
				}).done(function  () {
					quickdialog('保存成功');
				}).fail(function  () {
					quickdialog('保存失败，请重新尝试');
				}).always(function  () {
					isAjax = 0;
					$('.submit').val('保存');
				})
		});
	})
})
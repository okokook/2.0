define(function  (require,exports,module) {
	var dialog = require('dialog');
	require('distpicker');
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
				data.nickname = $('#nickname').val();
				console.log(data.nickname);
				data.sex = $('input[name="gender"]:checked').val();
				data.province = $('#province').val();
				data.city = $('#city').val();
				data.district = $('#district').val();
				data.instro = $('.text-large').val();
				data.address = $('#address').val();
				if (data.nickname.length>7||data.nickname.length<2) {
					quickdialog('请修改昵称，字数为2-7位');
					return;
				}
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
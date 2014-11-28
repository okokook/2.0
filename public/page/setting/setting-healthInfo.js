define(function  (require,exports,module) {
	var birthday = require('birthday');
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
				data.realname = $('#name').val();
				data.sex = $('input[name="gender"]:checked').val();
				data.year = $(".sel_year").val();
				data.month = $('.sel_month').val();
				data.day = $('.sel_day').val();
				data.province = $('#province').val();
				data.city = $('#city').val();
				data.district = $('#district').val();
				data.bloodtype = $('#blood-type').val();
				data.height = $('#height').val();
				data.weight = $('#weight').val();
				data.identity = $('#identity').val();

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
		$.ms_DatePicker({
			YearSelector: ".sel_year",
			MonthSelector: ".sel_month",
			DaySelector: ".sel_day"
		});
	})
})
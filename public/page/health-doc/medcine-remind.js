define(function  (require,exports,module) {
	var 
	dialog = require('dialog'),
	data ={};
	data.time = [];
	function quickDialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000)
	}

	function check (ele) {
		data.name = ele.find('#medcine-name').val();
		if (data.name == '') {
			quickDialog('请填写药物名称');
			ele.find('#medcine-name').focus();
			return;
		}
		data.date = $('#start').data('date');
		console.log(data.date);
		if (data.date == undefined) {
			quickDialog('请选择时间');
			return;
		}
		data.repeat = ele.find('#remind-repeat option:selected').val();
		console.log(data.repeat);
		if (data.repeat == 0) {
			quickDialog('请选择重复次数');
			return;
		}
		if ($('.add-time').length == 0) {
			quickDialog('请选择提醒时间');
			return;
		}
		return true;
	}

	$('#remind-minitue').change(function  (e) {
		var 
		min = $('#remind-minitue option:selected').text(),
		hour = $('#remind-hour option:selected').text(),
		text = hour+':'+min,
		html = '<a class = "add-time" href="javascript:;">'+text+'<i></i></a>';

		$('.add-time-wrapper').prepend(html);
	})

	$(document).on('click','.add-time',function  (e) {
		e.preventDefault();
		$(this).remove();
	})

	//保存
	$('.save').click(function  (e) {
		e.preventDefault();
		var $parent = $(this).closest('.bd');
		if (check($parent)) {
			$('.add-time').each(function  () {
				var text = $(this).text();
				data.time.push(text);
			})
			$.getJSON('test',{'data':data}).done(function  () {
				quickDialog('添加成功');
			})
		}
	})
})
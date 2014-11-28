define(function  (require,exports,module) {
	var 
	dialog = require('dialog'),
	data ={};

	function quickDialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000)
	}

	//切换
	$('.expand').click(function  (e) {
		e.preventDefault();
		$(this).closest('.short-wrapper').hide();
		$(this).closest('.short-wrapper').next('.expand-wrapper').show();
	})

	$('.short').click(function  (e) {
		e.preventDefault();
		$(this).closest('.expand-wrapper').hide();
		$(this).closest('.expand-wrapper').prev('.short-wrapper').show();
	})

	function check (ele) {
		data.date = ele.find('.dateCon').data('date');
		if (data.date == undefined) {
			quickDialog('请选择时间');
			return;
		}
		data.name = ele.find('.disease-name').val();
		if (data.name == '') {
			quickDialog('请填写名称');
			ele.find('.disease-name').focus();
			return;
		}
		data.con = ele.find('#add-con').val();
		if (data.con == '') {
			quickDialog('请填写内容');
			ele.find('#add-con').focus();
			return;
		}
		return true;
	}

	//保存
	$('.save').click(function  (e) {
		e.preventDefault();
		var $parent = $(this).closest('.item');
		if (check($parent)) {
			$.getJSON('test',{'data':data}).done(function  () {
				quickDialog('添加成功');
			})
		}
	})
})
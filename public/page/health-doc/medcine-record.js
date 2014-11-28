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
		data.start = $('#start').data('date');
		if (data.start == undefined) {
			quickDialog('请选择开始时间');
			return;
		}

		data.end = $('#end').data('date');
		if (data.end == undefined) {
			quickDialog('请选择结束时间');
			return;
		}

		data.name = ele.find('#medcine-name').val().trim();
		if (data.name == '') {
			quickDialog('请填写药物名称');
			ele.find('#medcine-name').focus();
			return;
		}

		data.time = ele.find('#record-time').val().trim();
		if (data.time == '') {
			quickDialog('请填写服药频次');
			return;
		}

		data.num = ele.find('#record-num').val().trim();
		if (data.num == '') {
			quickDialog('请填写服药数量');
			return;
		}

		data.spec = ele.find('#medcine-spec').val().trim();
		if (data.spec == '') {
			quickDialog('请填写药物规格');
			return;
		}
		data.method = ele.find('#medcine-method option:selected').val().trim();

		return true;
	}

	//保存
	$('.save').click(function  (e) {
		e.preventDefault();
		var $parent = $(this).closest('.bd');
		if ( check($parent) ) {
			$.getJSON('test',{'data':data}).done(function  () {
				quickDialog('添加成功');
			})
		}
	})
})
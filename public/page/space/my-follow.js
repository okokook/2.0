define(function  (require,exports,module) {
	var common  = require('./common');
	$(function  () {
		$(".follow-cancel").click(function  (e) {
			e.preventDefault();
			var 
			$ele = $(this),
			id = $ele.closest('.follow-item').data('id'),
			d = common.dialog({
				skin:"select-dialog",
				title:'提示',
				content:'确定取消关注？',
				ok: function () {
			       $.getJSON('test',{'id':id}).done(function  () {
			       $ele.parents('.follow-item').hide()
			   		})
			    },
			    okValue:'确定',
			    cancelValue: '取消',
				cancel: function () {}
			});

			d.show();
		})
	})
})
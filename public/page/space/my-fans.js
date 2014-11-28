define(function  (require,exports,module) {
	var common  = require('./common');
	$(function  () {
		$('.fans-btn').click(function  (e) {
			e.preventDefault();
			var 
			$ele = $(this),
			$wrapper = $ele.closest('.fans-item'),
			id = $wrapper.data('id');

			$.getJSON('test',{'id':id}).done(function  () {
				$ele.parents('.un-fans').hide().prev('.fansing').css('display','inline-block');
			})
		});

		$('.remove-fans').click(function  (e) {
			var 
			$ele = $(this),
			$wrapper = $ele.closest('.fans-item'),
			id = $wrapper.data('id'),
			that = this;
			e.preventDefault();
			var d = common.dialog({
						skin:'select-dialog',
					    title: '提示',
					    content: '确定移除吗（移除后将会把他加入黑名单，此人将不能收到关于您的动态）',
					    okValue: '确定',
					    ok: function  () {
					    	$.getJSON('test',{"id":id}).done(function  () {
					    		$(that).closest('li').remove();
					    	})
					    },
					    cancelValue: '取消',
					    cancel: function () {}
					});
					d.show();
		})

		// 举报
		
	})
})

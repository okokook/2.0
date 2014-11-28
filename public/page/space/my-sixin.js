define(function  (require,exports,module) {
	var common  = require('./common');

	$(function  () {
		//私信操作函数

	$('.my-msg_box').on('click',function  (e) {
		var $ele = $(e.target);
		var classname = $ele[0].className;
		switch(classname) {
			case 'msg-delete':
				e.preventDefault();
				var d = common.dialog({
						skin:'select-dialog',
						title:'提示',
						content:'确定要删除这条私信吗？',
						ok: function () {
							var id = $ele.data('id');
					       $.getJSON('test1',{data:id}).done(function  () {
					       $ele.parents('.msg-item').remove();
					   		})
					    },
					    okValue:'确定',
					    cancelValue: '取消',
	    				cancel: function () {}
					});
					d.showModal();
				break;
				case 'msg-con':
				case 'msg-name':
				case 'msg-time':
				e.preventDefault();
				var url = $ele.parents('.msg-item').data('url');
				console.log(url);
				window.location.href=url;
				break;
		}
	});
	})
})

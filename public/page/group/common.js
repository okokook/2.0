define(function  (require,exports,module) {
	require('common');
	require('post-handle');
	var template = require('template');
	var initPagination = require('Pagination');
	var dialog = require('dialog');
	//分页初始化
	function Pagecallback(event,page){
		$.getJSON(OP_CONFIG.pageURL,{page:page}).done(function(data){
			var html = template(OP_CONFIG.pageTem,data);
			$('.group-comment .bd ul').html(html);
		})
	}

	if (OP_CONFIG.totalPages > 1) {

		$('#pagination').twbsPagination({
			onPageClick: Pagecallback
		});

	}

	function quickDialog (con) {
		var d = dialog({
			content:con
		})
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000)
	}
	$(document)
	.on('click','.add-follow',function  (e) {
		e.preventDefault();
		var
		$ele = $(this),
		id = $ele.data('id'),
		loginstate=document.cookie.match(/(?:;|^)\s*loginState=([^;])/);
		if (loginstate&&loginstate[1]&&loginstate[1]!="0") {

			$.getJSON('test',{"id":id}).done(function  () {
				$ele.text('退出该小组');
				$ele.removeClass('add-follow').addClass('cancel-follow');
				if (OP_CONFIG.page=='post') {
					$('.editor-box').addClass('group-joined');
					OP_CONFIG.isAdded = true;
				}
				quickDialog('加入小组成功');
			})

		} else{

			require.async('login',function (login){
				login.init();
			})
		}
	})
	.on('click','.cancel-follow',function  (e) {
		e.preventDefault();
		var
		$ele = $(this),
		id = $ele.data('id'),
		d = dialog({
					skin:'select-dialog',
				    title: '提示',
				    content: '确定退出本小组吗？',
				    okValue: '确定',
				    ok: function  () {
				    	$.getJSON('test',{"id":id}).done(function  () {
							$ele.text('加入小组');
							$ele.removeClass('cancel-follow').addClass('add-follow');
							if (OP_CONFIG.page=='post') {
								$('.editor-box').removeClass('group-joined');
								OP_CONFIG.isAdded = false;
							}
						})
				    },
				    cancelValue: '取消',
				    cancel: function () {}
				});
		
		d.show();
	});

})
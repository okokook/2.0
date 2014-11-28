define(function  (require,exports,module) {
	require('./common');
	require('cardFace');


	var
	template = require('template'),
	nextPage = 1,
	data={},
	dialog = require('dialog');
	data.type='all';
	

	function quickDialog (con) {
		var  d = dialog({content:con});
		d.show();
		setTimeout(function  () {
			d.close().remove();
		},1000)
	}

	
	function  loadData(data,page) {
		if (data) {
			$.getJSON('test1',{data:data}).done(
				function  (data) {
					var html = template('group-recommend_template',data);
					$('.recommend-list .list-item-wrapper').html(html);
					data.type="all";
				})
		} else {
			$.getJSON('test').done(
				function  (data) {
					var html = template('group-recommend_template',data);
					$('.recommend-list .list-item-wrapper').append(html);
					nextPage = data.page;
				})
		}
	}

	$(function  () {
		$(window).scroll(function () {
			var pageHeight = $(window).height();
			var totalHeight = $('.footer').offset().top;
			var scrollHeight = $(this).scrollTop();
			var currentHeigt = scrollHeight+pageHeight;
			if (currentHeigt >= totalHeight && nextPage>0 && $('.list-cat .selected').hasClass('all')) {
				loadData('',nextPage);
			}
		});

		$('.list-cat').on('click','a',function  (e) {
			e.preventDefault();
			var $ele = $(this);
			if ($ele.hasClass('selected')) {
				return;
			}
			$('.selected').removeClass('selected');
			$ele.addClass('selected');
			data.id=$ele.data('id');
			loadData(data);
		});

		// 关注某人 或全部
		$(document)
		.on('click','.follow',function  (e) {
			e.preventDefault();
			var $ele = $(e.target);
			var id = $ele.data('id');
			$.getJSON('test',{'cid':id}).done(function  () {
				quickDialog('关注成功');
				$ele.text('已关注');
				$ele.removeClass('follow').addClass('followed');
			}).fail(function  () {
				quickDialog('后台存储失败，请刷新重试')
			});
		})
		.on('click','.oneFollowAll',function  (e) {
			e.preventDefault();
			var 
			$ele = $(e.target),
			$wrapper = $ele.closest('.wall-item'),
			cat = $wrapper.data('cat');
			$.getJSON('test',{'cat':cat}).done(function  (data) {
				quickDialog(data.con);
			}).fail(function  () {
				quickDialog('后台存储失败，请刷新重试')
			});
		})
		.on('click','.more',function  (e) {
			e.preventDefault();
			var
			 $ele = $(e.target),
			 id = $ele.closest('.list-item').data('id');
			 data.id = id;
			 data.type = $ele.data('type');
			 $('.list-cat a[data-id="'+id+'"]').click();
		})
	})
})
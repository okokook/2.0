define(function(require, exports, module){
	var template = require('template');
	var dialog = require('dialog');
	require('common');
	if (OP_CONFIG.page !=='index') {
		require('./loadData');
	}

	$(function  () {
		//提问
		
		// 数据格式
		// {"con":{img_link:'http://www.baidu.com',doc_name:"lineng",doc_id:'dfa',doc_ins:"dasfsdfasasdfasafsd"}}
		$('.doctor-answer .bd').on('click','.doc-follow',function  (ev) {
			ev.preventDefault();
			var url='';
			var id = $(this).data(id);
			var that = this;
			$.getJSON('test',{id:id}).done(function  (data){;
				$(that).text('已关注');
				var data = data.con;
				var html = template('single-doc_ask',data);
				$(that).parents('li').remove();
				$('.doctor-answer .bd ul').append(html);
			});
		});


		//tab切换
		$('.tab-person .hd').on('click','a',function  (e) {
			e.preventDefault();
			var index = $(this).index();
			$(this).parents('.tab-person').find('.selected').removeClass('selected');
			$(this).addClass('selected');
			$(this).parents('.tab-person').find('.bd .item').eq(index).addClass('selected');
		});
		exports.dialog = dialog;

	});
})
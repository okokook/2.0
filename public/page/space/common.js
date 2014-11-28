define(function(require, exports, module){
	var template = require('template');
	var dialog = require('dialog');
	require('common');

	$(function  () {
		//提问
		$('.doctor-answer .bd').on('click','.doc-ask',function  (e) {
			e.preventDefault();
			var html = "<textarea style='width:400px;height:100px;padding:10px;'></textarea>";
			var url = "";
			var d = dialog({
				title:'提问',
				content:html,
				zIndex: 870000,
				ok: function () {
			       $.getJSON(url).done(function  (data) {
			       	d.close();
			       })
			    },
			    okValue:'发送消息',
			    statusbar:'同时发表到<select name="" id=""><option value="">234</option><option value="">dfa</option><option value="">sdf</option></select>'
			});
			d.showModal();
		});

		/*医生刷新 
		数据格式
		 {
			list:[
				  {img_link:'http://www.baidu.com',doc_name:"lineng",doc_id:'dfa',doc_ins:"dasfsdfasasdfasafsd"},
				  {img_link:'http://www.baidu.com',doc_name:"lineng",doc_id:'dfa',doc_ins:"dasfsdfasasdfasafsd"},
				  {img_link:'http://www.baidu.com',doc_name:"lineng",doc_id:'dfa',doc_ins:"dasfsdfasasdfasafsd"},
				  {img_link:'http://www.baidu.com',doc_name:"lineng",doc_id:'dfa',doc_ins:"dasfsdfasasdfasafsd"}
				 ]};*/
		

		$('.refresh').click(function (e) {
			var url = '';
			e.preventDefault();
			$.getJSON('test2').done(function  (data) {
				var html = template('doc-ask',data);
				$('.doctor-answer .bd').html(html); 
			});
		});

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
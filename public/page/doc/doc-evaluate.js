define(function  (require, exports, module) {
	var template = require('template');
	var dialog = require('dialog');
		//选择提示
	function selectTip(con) {
		var d = dialog({
			'width':'600px',
			skin: 'select-dialog inspection',
			title: '常规检查项目',
			content: con
		});
		d.show();
	}
	$(document)
	.on('click','.post-expand',function (e){
		e.preventDefault();
		$('.post-item_pro').hide();
		$('.see-all').show();
	})
	.on('click','.post-packUp',function (e){
		e.preventDefault();
		$('.post-item_pro').show();
		$('.see-all').hide();
	})
	.on('click','.show-inspection',function (e){
		e.preventDefault();
		var id = $(this).data('id');
		$.getJSON('test8',{id:id}).done(function (data){
			var html = template('inspection-template',data);
			selectTip(html);
		})
	})
	.on('click','.btn-submit',function (){

	})
	.on('click','.inspection-hd a',function (e){
		e.preventDefault();
		var index = $(this).index();
		$('.inspection-hd a').removeClass('selected');
		$(this).addClass('selected');
		$('.inspection-bd .inspection-item').removeClass('selected').eq(index).addClass('selected');
	})
})
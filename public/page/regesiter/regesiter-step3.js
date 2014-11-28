define(function  (require, exports, module) {
	var dialog = require('dialog');
	var data = {};
	var followData = {};

	function quickDialog (con) {
		var d = dialog({content:con});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000);
	}

	//判断对象是否为空
	function isOwnEmpty(obj) {
    	for(var name in obj) {
        if(obj.hasOwnProperty(name)) {
            return false;
        	}
    	}
    	return true;
	}

	//换一批
	$('.refresh').click(function (e) {
		e.preventDefault();
		var $ele = $(this);
		var $wrapper = $ele.closest('.recom-user-list');
		var id = $('.disease-box .show').data('cat');

		data.groupId = id;
		data.cat = $ele.data('cat');
		data.times = parseInt($ele.data('num'));

		$.getJSON('test2',{data:data}).done(function  (data) {
			var html = template('recom-template',data);
			$wrapper.find('.user-list-bd').html(html);

			var num = parseInt($ele.data('num'))+1;
			$ele.data('num',num);
		});
	});

	//加关注
	$(document)
		.on('click','.follow-btn',function(e){
			if ($(this).hasClass('followed')) {
				return;
			}
			var $ele = $(this);
			var id = $ele.data('id');
			var cat = $('.disease-box .show').data('cat');

			if (!followData[cat]) {
				followData[cat] = [];
			}
			followData[cat].push(id);
			$ele.addClass('followed').text('已关注');
		})
		.on('click','.followed',function(e){
			var $ele = $(this);
			var id = $ele.data('id');
			var cat = $('.disease-box .show').data('cat');
			followData[cat].splice($.inArray(id,followData[cat]),1);
			$ele.removeClass('followed').text('+加关注');
		})
		.on('click','.btn-save',function () {
			if (isOwnEmpty(followData)) {
				quickDialog('您最少需要关注一位帮友或医生');
				return;
			}
			
			$.getJSON('test',{data:followData}).done(function () {
				//window.location.href =""
			})
		})
		.on('click','.disease-box li',function (){
			var index = $(this).index();
			$('.disease-box .show').removeClass('show');
			$(this).addClass('show');

			$('.tag-box li').removeClass('selected').eq(index).addClass('selected');
		})
})

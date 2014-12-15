define(function  (require,exports,module) {
	require('post-handle');
	require('index');
	require('./common');
	var dialog = require('dialog');

$(function  () {
	var title = $('#group-info .title').text().split(0,-2)+"疗法",
		titleArray=["常用药物","常用疗法","病因","鉴别","治疗","并发症","预防","医生"],
		change=false;


	$('.tabgroupnav').on('click', 'a', function(event) {  //m
		event.preventDefault();
		var $cur = $(this),
			index = $cur.parent('li').index(),
			name = titleArray[index];
		// tab切换
		$('.tabgroupnav a').removeClass('cur');
		$cur.addClass('cur');

		/*// 标题切换
		$('.tab-hd').text(name);*/

		//tabcontent切换

		$('.tabcontent .tabItem').removeClass('cur');
		$('.tabcontent .tabItem').eq(index).addClass('cur');

		//展开更多初始化

		$('.getmore .up').hide();
		$('.getmore .down').show();
		$('.getmore .title').text('展开看详情');

		//隐藏内容初始化

		$('.tabcontent .cur .dn').hide();
		$('.tabcontent .cur .show').show();
		});

		$('.rateit-selected').each(
			function  () {
				var width = Number($(this).parent().attr('num'))*18;
				$(this).width(width);
			});
		$('.medcom-detail tr:first td:gt(0)').css('color','#555');

		
		//去table下边框

		$('.medical-rank table tr:last').addClass('noborder');

	$('.getmore').click(function(event) {
		if($(this).parents('.middle-hot').find('.tabcontent>.cur').hasClass('medical-rank')){
			//var link = $(this).find('.newpage01')[0].href;
			//window.location.href=link;
			$(this).find('.newpage01')[0].click();
			return;
		}
		if($(this).closest('.middle-hot').find('.tabcontent>.cur').hasClass('method')){
			//var link = $(this).find('.newpage02')[0].href;
			//window.location.href=link;
			$(this).find('.newpage02')[0].click();
			return;
		}
		event.preventDefault();

		var title=$('.getmore .title').text()=="展开看详情"?"收起详情":"展开看详情";
		if (title=="收起详情") {
			$('.tabcontent  .cur .show').hide();
			$('.tabcontent  .cur .dn').show();
		} else{
			$('.tabcontent  .cur .dn').hide();
			$('.tabcontent  .cur .show').show();

		}
		$('.getmore .title').text(title);
		$('.getmore .up,.getmore .down').toggle();
	});

})

})
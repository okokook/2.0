define(function  (require,exports,module) {
	var dialog = require('dialog');
	var data={};
	$(function  () {
		// 右侧选择标签
		$('.tag-box .bd').on('click','.tagItem-bd a',function  (e) {
			e.preventDefault();
			var $ele = $(this);
			var id = $ele.data('id');
			if ($ele.hasClass('selected')) {
				$('.selected-tag_wrapper .bd a[data-id="'+id+'"').click();
				return;
			}
			var text = $ele.text();
			var str = htmlplate(id,text);
			var cat = $ele.data('cat');
			if (!data[cat]) {
				data[cat]=[];
				data[cat].push('zhanwei');
			}
			data[cat].push(id);
			$('.selected-tag_wrapper .bd').prepend(str);
			$('.selected-bg').show();
			$ele.addClass('selected');

			$('.disease-box a[data-cat="'+cat+'"]').closest('li').addClass('selected');

		});
		
		//标签删除
		$('.selected-tag_wrapper .bd').on('click','a',function  (e) {
				e.preventDefault();
				var id = $(this).data('id');
				var $ele = $('.tag-box .bd [data-id="'+id+'"]');
				var cat = $ele.data('cat');
				$ele.removeClass('selected');
				data[cat].splice($.inArray(id,data[cat]),1);
				$.each(data,function  (key,value) {
					if (!value.length) {
						$('.disease-box [data-cat="'+key+'"]').removeClass('selected');
					}
				});
				$(this).remove();
				var size = $('.selected-tag_wrapper .bd a').length;
				if (size == 0) {$('.selected-bg').hide();}
		});

		//只选择小组
		$('.disease-box i').click(function  (e) {
			var $ele = $(this).prev('a');
			var $li = $(this).closest('li');

			if ($li.hasClass('selected')) {
				selectDialog($li)
			} 
			else {
				$li.addClass('selected');
				var cat = $ele.data('cat');
				if (!data[cat]) {
					data[cat]=[];
					data[cat].push('zhanwei');
				}
			}
		})



		/*左侧ajax请求获得某种疾病的标签
		获得的数据格式：

		"标签类":[{"标签id","标签名称"},{"标签id","标签名称"},{"标签id","标签名称"}]

		例子:
		{
		"疗法":[{"1234":"穴位按摩"},{"2345":"针灸"}],
		 "相关疾病":[{"12345":"心脏"},{"23456":"肝脏病"}],
		}

		*/

		$('.disease-box .bd').on('click','a',function  (e) {
			e.preventDefault();
			var $ele = $(this).closest('li');
			if ($ele.hasClass('show')) {return;}
			$('.show').removeClass('show');
			$ele.addClass('show');
			var cat = $(this).data('cat');
			if (!data[cat]) {
				data[cat] = [];
			}
			if ($ele.data('isajax')) {
				var index = $ele.closest('li').index();
				$('.tag-box li').hide().eq(index).show();
			} else{
				$.getJSON('test',{data:data}).done(
				function  (data) {
					var htmlpl = ajaxhtml(data);
					$('.tag-box .bd li').hide();
					$('.tag-box .bd ul').append(htmlpl);
					$('.tag-box .bd li:visible a').data('cat',cat)
					$ele.data('isajax',true);
					});
			}
			
		});

		//保存
		$('.btn-save').click(function  (e) {
			e.preventDefault();
			if (isOwnEmpty(data)) {
				quickDialog('请选择小组或标签');
				return;
			}
			$.getJSON('test',{data:data}).done(function  () {
			 window.location.href="regesiter-step3.html";
			}).fail(function  () {
				quickDialog('保存失败，请刷新重试');
			})
		})

		//一键关注
		$(document).on('click','.tag-follow-all',function (e){
			e.preventDefault();
			var $li = $(this).closest('.tagItem');
			$li.find('.tagItem-bd a').click();
		})
	});
	
	function quickDialog (con) {
		var d = dialog({content:con});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000);
	}
			//选择提示
	function selectDialog(ele) {
		var d = dialog({
			skin: 'select-dialog',
			title: '确定取消关注该疾病',
			content: '确定后您在该疾病下选择的标签都将被删除',
			okValue: '确定',
			ok: function() {
				outgroup(ele);
			},
			cancelValue: '取消',
			cancel: function() {}
		});
		d.show();
	}

	//不关注该疾病
	function outgroup(ele) {
		var $ele = $(ele).removeClass('selected');
		var cat = $ele.find('a').data('cat');
		$('.tag-box .bd [data-cat="'+cat+'"].selected').click();
		delete data[cat];
	}

	function htmlplate (id,text) {
		var html = "";
		html+='<a href="" data-id="'+id+'">'+text+'<i></i></a>';
		return html;
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


	function  ajaxhtml(data) {
		  		var html = " ";
				html+='<li>'
				$.each(data,function (key,value) {
					html+='<div class="tagItem"><div class="tagItem-hd">'+key+'<a href="" class="tag-follow-all">一键关注</a></div><div class="tagItem-bd">';
					$.each(value,function  (index,value) {
						$.each(value,function  (key,value) {
							html+='<a href="" data-id="'+key+'">'+value+'</a>';
						})
					});
					html+='</div></div>'
				});
				html+="</li>";

				return html;
			}
})
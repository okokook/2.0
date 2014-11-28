define(function  (require,exports,module) {
	var dialog = require('dialog');
	var template = require('template');
	var newData = [];
	var deleteArray = [];
	var data = {};

	$(function  () {
		// 右侧选择标签
		$('.tag-box .bd').on('click','a',function  (e) {
			e.preventDefault();
			var $ele = $(this);
			var id = $ele.data('id');
			if ($ele.hasClass('selected')) {
				$('.selected-tag_wrapper .bd a[data-id="'+id+'"').click();
				return;
			}
			if ($ele.hasClass()) {
				expression
			}
			var text = $ele.text();
			var cat = $ele.data('cat');
			var str = htmlplate(id,text,cat);
			$('.selected-tag_wrapper .bd').prepend(str);
			$('.selected-bg').show();
			$ele.addClass('selected');

			$('.disease-box a[data-cat="'+cat+'"]').addClass('selected');

		});
		//标签删除
		$('.selected-tag_wrapper .bd').on('click','a',function  (e) {
				e.preventDefault();
				var id = $(this).data('id');
				var $ele = $('.tag-box .bd [data-id="'+id+'"]');
				var cat = $ele.data('cat');
				$ele.removeClass('selected');
				$.each(data,function  (key,value) {
					if (!value.length) {
						$('.disease-box [data-cat="'+key+'"]').removeClass('selected');
					}
				});
				$(this).remove();
				var size = $('.selected-tag_wrapper .bd a').length;
				if (size == 0) {$('.selected-bg').hide();}
		});

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
			var $ele = $(this);
			if ($(this).hasClass('show')) {return;}
			$('.show').removeClass('show');
			$(this).addClass('show');
			var cat = $(this).data('cat');
			if ($ele.data('isajax')) {
				var index = $ele.closest('li').index();
				$('.tag-box li').hide().eq(index).show();
			} else{
				$.getJSON('test',{data:cat}).done(
				function  (data) {
					var htmlpl = template('tag-edit-template',data);
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
			data={};
			getData();
			console.log(data);
			$.getJSON('test',{data:data}).done(function  () {
				// window.location.href="/";
			}).fail(function  () {
				quickDialog('保存失败，请刷新重试');
			})
		})
	});
	function quickDialog (con) {
		var d = dialog({content:con});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000);
	}
	function htmlplate (id,text,cat) {
		var html = "";
		html+='<a href="" data-id="'+id+'" data-cat="'+cat+'">'+text+'<i></i></a>';
		return html;
	}

	function  getData() {

		$('.selected-tag_wrapper .bd a').each(function  () {
			var $ele = $(this);
			var id = $ele.data('id');
			newData.push(id);
		});

		compareData(originalData,newData);
	}

	function  compareData(arr1,arr2) {
		
		var len1 = arr1.length;
		var len2 = arr2.length;
		for (var i = 0; i < len1; i++) {
			var item1 = arr1[i];
			for (var j = 0; j < len2; j++) {

				if(item1 == arr2[j]) {
					deleteArray.push(item1);
				}
			};
		}

		data.add = deleteItem(deleteArray,newData);
		data.remove =  deleteItem(deleteArray,originalData);
	}

	function deleteItem (item,array) {
		for (var i = 0; i < item.length; i++) {
			array.splice($.inArray(item[i],array),1);
		}

		return array;
	}
})
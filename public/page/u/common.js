define(function  (require,exports,module) {
	var dialog = require('dialog');

	function quickDialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function () {
			d.close().remove();
		},1000)
	}

	function reportTpl () {
		/*<div class="spam_type">
		<span>举报原因：</span>
		<input type="radio" id="spam_ad" name="spam" value="1"><label for="spam_ad">垃圾广告</label>
		<input type="radio" id="spam_porn" value="2" name="spam"><label for="spam_porn">色情低俗</label>
		<input type="radio" id="spam_politics" value="3" name="spam"><label for="spam_politics">激进时政话题</label>
		<input type="radio" id="spam_irre" value="4" name="spam"><label for="spam_irre">与慢性病健康无关</label>
		<p class="reportPost-tip">*请选择举报原因</p>
		</div>*/
	}

	var tpl = {
	   		reportTpl:reportTpl
		}

	function getTpl(m){
		var r=/\/\*([\S\s]*?)\*\//m,
			m=r.exec(tpl[m].toString());
		return m&&m[1]||m;
	}

	//举报评论

	function reportPost(id,ele){
		var html = getTpl('reportTpl');
		var d = dialog({
			skin: 'my-post',
			width: 560,
			title:'举报',
			content:html,
			ok:function(){
				var ischecked = $('.spam_type input:checked')[0];
				if (!ischecked) {
					$('.reportPost-tip').show();
					return false;
				}
				var value = ischecked.value;
				$.ajax({url:'test',data:{value:value,cid:id},dataType:'json'}).done(function () {
					quickDialog('举报成功');
				});
			},
			okValue:"确定",
			cancel:function (){},
			cancelValue:"取消"
		});
		d.showModal();
	}

	$(document)
	.on('click','.follow-btn',function  (e) {
		e.preventDefault();
		var
		$ele = $(this),
		id = $ele.closest('operate-wrapper').data('id');
    	$.getJSON('test',{"id":id}).done(function  () {
			$ele.closest('.un-follow').hide().prev('.following').show();
		})
	})
	.on('click','.follow-cancel',function  (e) {
		e.preventDefault();
		var
		$ele = $(this),
		id = $ele.closest('.operate-wrapper').data('id'),
		d = dialog({
					skin:'select-dialog',
				    title: '提示',
				    content: '确定取消关注吗？',
				    okValue: '确定',
				    ok: function  () {
				    	$.getJSON('test',{"id":id}).done(function  () {
							$ele.closest('.following').hide().next('.un-follow').show();
						})
				    },
				    cancelValue: '取消',
				    cancel: function () {}
				});
		
		d.show();

	})
	.on('click','.black-list',function  (e) {
		e.preventDefault();
		var
		$ele = $(this),
		id = $ele.closest('.operate-wrapper').data('id'),
		d = dialog({
					skin:'select-dialog',
				    title: '提示',
				    content: '确定要将此人加入黑名单吗，加入后他将不能关注您，也不能给你发信息？',
				    okValue: '确定',
				    ok: function  () {
				    	$.getJSON('test',{"id":id}).done(function  (data) {
							quickDialog(data.con);
						})
				    },
				    cancelValue: '取消',
				    cancel: function () {}
				});
		
		d.show();
	})
	.on('click','.report',function (e){
			e.preventDefault();
			var $ele = $(this);
			var topicId = $ele.closest('.oprate-wrapper').data('id');
			reportPost(topicId,$ele)
		})
	.on('click','.fans-btn',function  (e) {
			e.preventDefault();
			var 
			$ele = $(this),
			$wrapper = $ele.closest('.fans-item'),
			id = $wrapper.data('id');
			$.getJSON('test',{'id':id}).done(function  () {
				$ele.parents('.un-fans').hide().prev('.fansing').css('display','inline-block');
			})
		});
})

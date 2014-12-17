define(function  (require,exports,module) {
	require('common');
	require('./common');
	var bxSlider = require('bxslider');
	var qqFace = require('qqFace');
	var dialog = require('dialog');
	var imgupload = require('imgupload');

	var offsetTop = $('.app-wrapper').offset().top;

	//图片上传
	var uploadObj = {
		url: 'test'
	}
	imgupload.imgupload(uploadObj);

	//上传图片
		$(document).on('click','.upload-img,.pic-add-btn',function  () {
					$('.img-upload_box').css({'height':"auto","padding-top":"20px"});
					$('input[type="file"]').click();
				})


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

	//检查是否登陆 用cookie防止其它页登出本页不响应
	function isLogin () {
		var loginstate=document.cookie.match(/(?:;|^)\s*loginState=([^;])/);
		return loginstate&&loginstate[1]&&loginstate[1]!="0";
	}

	//喜欢贴子
	function loveTopic(tid,ele){
		$.getJSON('test',{topicid:tid},function(){
				quickTip('喜欢成功');
				ele.removeClass('hug').addClass('huged').attr('title',"您已喜欢");
		});
	}

	//快速提示
	function quickTip(con){
		var d = dialog({
			content:con
		});
		d.show();
       	setTimeout(function  () {
						d.close().remove;
					},1000);
	}

	//回复评论中的评论
	function quickComment (id,ele) {
		var $ele = ele.closest('li');
		if (ele.data('show')) {
			$ele.find('.input-box').hide();
			ele.data('show',false);
		} else{
		$ele.find('.input-box').show().find('.input-con').focus();
		ele.data('show',true);
		}
	}

	//回复评论
	function  commentSubmit(tid,ele) {
		commentEle =ele;
		var $con = ele.closest('.quick-submit_wrapper').prev('.input-con'),
		    con = $con.val().trim();
		if(!con){
			$con.focus();
			return;}
		if (ele.data('repeat')) {
			return;
		}
		ele.data('repeat',true);
		ele.text('提交中...').css('cursor','not-allowed');
		$.getJSON('test',{con:con,tid:tid}).done(function  () {
			quickTip('评论成功');
		}).always(function  () {
			ele.text('评论').css('cursor','pointer').data('repeat',false);
			$con.val(' ');
		})
	}

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
					quickTip('举报成功');
				});
			},
			okValue:"确定",
			cancel:function (){},
			cancelValue:"取消"
		});
		d.showModal();
	}


	$(function  () {
		//轮播图片函数
		$('.newfeed-list').bxSlider({
		 	mode:'vertical',
		 	auto:true,
		 	slideWidth:258,
		 	slideMargin:16,
		 	minSlides:3,
	  		maxSlides: 3,
	  		moveSlides: 1,
	  		controls:false,
	  		pager:false,
	  		pause:6000
		 });

		$('.emotion').each(function  () {
			$(this).qqFace({
				id : 'facebox', //表情盒子的ID
				assign:'con-wrapper', //给那个控件赋值
			});
		})

		$(document)
		.on('click','.hug',function  () {//喜欢
			if (isLogin()) {
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				loveTopic(topicId,$ele);
			} else{
				require.async('login',function (login){
					login.init();
				})
			}
		})
		.on('click','.quick-replay_btn',function (e) {//弹出快速回复窗
			e.preventDefault();
			var $ele = $(this);
			var topicId = $ele.closest('li').data('id');
			quickComment(topicId,$ele);
		})
		.on('click','.comment_submit_btn',function  () {//回复评论
			if (isLogin()) {
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				commentSubmit(topicId,$ele);
			} else{
				require.async('login',function (login){
					login.init();
				})
			}
		})
		.on('click','.join-group',function  (e) {
			e.preventDefault();
			$('.add-follow').click();
		})
		.on('click','.reportComment',function (e){//举报帖子
			e.preventDefault();
			var $ele = $(this);
			var topicId = $ele.closest('li').data('id');
			reportPost(topicId,$ele)
		})
		.on('click','.quick_reply',function  (e) {//快速回复
			e.preventDefault();
			if (isLogin()) {

				if (OP_CONFIG.isAdded == true) {
					$('.editor-box')[0].scrollIntoView();
					$('#content-input').focus()
				}
				else {
					quickTip('请先关注本小组');
				}

			} 
			else {

				require.async('login',function (login){
					login.init();
				});

			}
		})
		.on('click','.sign-in',function  () {
			require.async('login',function (login){
				login.init();
			});
		})
		.on('click','.post-hug',function  () {
			var $ele = $(this);
			if ($ele.hasClass('isHuged')) {
				return;
			}
			var id = $ele.data('id');
			$.getJSON('test',{id:id}).done(function  (data) {
				quickTip(data);
				$ele.addClass('isHuged');
				var number = parseInt($ele.find('.hug-num').text())+1;
				$ele.find('.hug-num').text(number);
				$ele.find('.hug-icon').text('已喜欢')
			})
		})
		.on('click','.uncollect',function  () {
			var $ele = $(this);
			var id = $ele.data('id');
			$.getJSON('test',{id:id}).done(function  (data) {
				quickTip(data);
				$ele.addClass('collected').removeClass('uncollect');
				$ele.find('.hug-icon').text('已收藏')
			})
		})
	})
	
	$(window).scroll(function  () {
	    var top = $(this).scrollTop();

	    if ($('.app-wrapper')[0]) {
	      if (top>=offsetTop) {
	        $('.app-wrapper').addClass('post-app-fixed');
	      } else{
	        $('.app-wrapper').removeClass('post-app-fixed');
	      }
	    }
	  });

	$('.btn-submit').click(function(e) {
		e.preventDefault();
		var data = {};
		var url = ''; //后台补充 为帖子的后台地址
		if ($(this).data('repeat') == true) {
			return;
		}
		var	postCon = $('#content-input').val().trim();

		if (!postCon) {
			$('#content-input').focus();
			quickdialog('请输入内容');
			return;
		}

		$(this).data('repeat', true);
		data.postCon = postCon;
		data.imgList = imgupload.imgList;

		$.getJSON(url, data).done(function(data) {


		})
	})
})

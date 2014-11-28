define(function(require, exports, module) {

	var dialog = require('dialog');
	var template = require('template');
	var qqFace = require('qqFace');
	var Pagination = require('Pagination');
	var atwho = require('atWho').atWho;


	var obj = {
		'quick_link': OP_CONFIG.user_link,
		'quick_author': OP_CONFIG.user_name,
		'quick_Piclink': OP_CONFIG.user_pic,
		'quick_time': "3秒前"
	}
	var data = {};

	

	//检查是否登陆 用cookie防止其它页登出本页不响应
	function isLogin() {
		var loginstate = document.cookie.match(/(?:;|^)\s*loginState=([^;])/);
		return loginstate && loginstate[1] && loginstate[1] != "0";
	}

	//表情替换
	function replace_em(str) {
		str = str.replace(/\</g, '&lt;');
		str = str.replace(/\>/g, '&gt;');
		str = str.replace(/\n/g, '<br/>');
		str = str.replace(/\[em_([0-9]*)\]/g, '<img src="images/face/$1.gif" border="0" />');
		return str;
	}

	function commentTpl() {
		/*
			<div class="post-comment_box edit-box_wrapper">
				<div class="input-box post_replay">
					<div class="tra"><em><i></i></em></div>
					<textarea class="input-con con-wrapper"></textarea>
					<div class="quick-submit_wrapper">
					<a href="javascript:;" class="add-smile emotion"></a>
					<span><input type="checkbox" id="toMyTopic" checked><label for="toMyTopic">同时转发到我的话题</label></span>
					<a href="javascript:;" class="input-btn post_submit_btn">确定</a></div>
				</div>
				<div class="quick-comment_list">
					<div class="hd">全部评论</div>
					<div class="loading"></div>
					<ul></ul>
				</div>
			</div>
		*/
	}

	function quickcommentTpl() {
		/*<div class="post-comment_box edit-box_wrapper">
			<div class="input-box comment_replay">
				<div class="tra"><em><i></i></em></div>
				<textarea class="input-con con-wrapper"></textarea>
				<div class="quick-submit_wrapper">
				<a href="javascript:;" class="add-smile emotion"></a>
				<a href="javascript:;" class="input-btn comment_submit_btn">确定</a></div>
			</div>
		</div>*/
	}

	function reportTpl() {
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
		commentTpl: commentTpl,
		quickcommentTpl: quickcommentTpl,
		reportTpl: reportTpl
			// forgetpwd:forgetpwdTpl
	}

	function getTpl(m) {
		var r = /\/\*([\S\s]*?)\*\//m,
			m = r.exec(tpl[m].toString());
		return m && m[1] || m;
	}

	//查看所有对话
	function seeAll(id, ele) {
		$.getJSON('test7', {
			id: id
		}).done(function(data) {
			var html = template('see-all_template', data);
			var d = dialog({
				skin: 'my-post post-item edit-box_wrapper',
				width: 560,
				title: '全部对话',
				content: html
			});
			d.showModal();
		})
	}

	//回复评论中的评论
	function quickComment(id, ele) {
		var $ele = ele.closest('li');
		if (ele.data('show')) {
			$ele.find('.input-box').hide();
			ele.data('show', false);
		} else {
			if (!$ele.find('.input-box')[0]) {
				var tpl = getTpl('quickcommentTpl');
				$ele.append(tpl);
			}
			$ele.find('.input-box').show().find('.input-con').focus();
			ele.data('show', true);
			var at_obj = $('.con-wrapper');
			atwho(at_obj);
		}
	}

	//评论框模块生成
	function getComment(ele, id) {
		var tpl = getTpl('commentTpl');
		var hasComment = ele.data('comment');
		var $ele = ele.closest('li');
		$ele.append(tpl);
		if (hasComment) {
			$('.quick-comment_list').show();
			$.getJSON('test5', {
				tid: id
			}).done(
				function(data) {

					var tpl = template('comment-list', data);
					$ele.find('.loading').hide();
					$ele.find('.quick-comment_list ul').append(tpl);
					var at_obj = $(".con-wrapper");
					atwho(at_obj);
				})
		}
	}

	//数目增加
	function numAdd(ele) {
			var $ele = ele.find('.num');
			$ele.text(parseInt($ele.text()) + 1);
		}
		//数目减少
	function numMinus(ele) {
		var $ele = ele.find('.num');
		$ele.text(parseInt($ele.text()) - 1);
	}

	//快速提示
	function quickTip(con) {
		var d = dialog({
			content: con
		});
		d.show();
		setTimeout(function() {
			d.close().remove;
		}, 1000);
	}

	//数据传递 返回
	function postId(data) {
			$.ajax({
				url: data.url,
				data: {
					iddd: "xxx"
				},
				dataType: "json"
			}).done(function() {
				quickTip(data.quickTip);
				data.ele.hide();
				data.ele.prev().show();
			});
		}
		//选择提示
	function selectTip(data) {
		var d = dialog({
			skin: 'select-dialog',
			title: '',
			content: data.con,
			okValue: '确定',
			ok: function() {
				postId(data);
			},
			cancelValue: '取消',
			cancel: function() {}
		});
		d.show();
	}

	//评论添加
	function addComment(cat, ele) {
		if (cat == 'single') {
			obj.isConversation = false;
		} else {
			obj.isConversation = true;
			var $ele = ele.closest('.quick-comment_wrapper');
			var commentName = $ele.find('.quick-comment_nick').text();
			var commentLink = $ele.find('.quick-comment_nick').attr('href');
			obj.quickTo_link = commentLink;
			obj.quickTo_author = commentName;
		}
		var tpl = template('single-comment', obj);
		var $wrapper = ele.closest('.post-item');
		var hasComment = $wrapper.find('.post-comment').data('comment');
		if (!hasComment) {
			$wrapper.find('.loading').hide();
			$wrapper.find('.quick-comment_list').show();
			$wrapper.find('.post-comment').data('comment', true);
		}
		$wrapper.find('.quick-comment_list ul').prepend(tpl);
	}

	//评论 评论的添加
	function addSecondComment(ele) {
			obj.isConversation = true;
			var $ele = ele.closest('.quick-comment_wrapper');
			var commentName = $ele.find('.quick-comment_nick').text();
			var commentLink = $ele.find('.quick-comment_nick').attr('href');
			var tpl = template('single-comment', obj);

		}
		//喜欢贴子
	function loveTopic(tid, ele) {
		$.getJSON('test', {
			topicid: tid
		}, function() {
			numAdd(ele);
			if (ele.children('.tit').length) {
				ele.removeClass('hug').addClass('huged').find('.tit').text('已喜欢').attr('title', "您已喜欢");
			} else {
				ele.removeClass('hug').addClass('huged').text('已喜欢').attr('title', "您已喜欢");
			}

			quickTip('喜欢成功');

		});
	}

	//收藏帖子
	function collectTopic(tid, ele) {
		$.getJSON('test', {
			tid: tid
		}).done(function() {
			quickTip("收藏成功");
			ele.hide();
			ele.next().show();
		})

	}

	//取消收藏本帖
	function unCollectTopic(tid, ele) {
		data.url = 'test';
		data.tid = tid;
		data.con = "你确定要取消收藏吗";
		data.quickTip = "取消收藏成功";
		data.ele = ele;
		selectTip(data);
	}

	//转发帖子
	function repostTopic(tid, ele) {
		var html = "<div class='edit-box_wrapper'><textarea style='width:480px;height:80px;padding:10px;' class='con-wrapper repost-con'></textarea><div class='quick-submit_wrapper'><a href='javascript:;' class='add-smile emotion'></a></div></div>";
		var d = dialog({
			skin: "my-post post-item",
			title: '转发到我的首页',
			content: html,
			ok: function() {
				var con = $('.repost-con').val();
				$.getJSON('test', {
					tid: tid,
					con: con
				}).done(function(data) {
					d.close();
					quickTip('私信已发出');
				});
				numAdd(ele);
			},
			okValue: '发出',
			cancelValue: '取消',
			cancel: function() {}
		});
		d.show();
	}


	//弹出评论框
	function showCommentBox(id, ele) {
		ele.hide().next().show();
		if (!ele.data('repeat')) {
			console.log('test');
			getComment(ele, id);
			ele.data('repeat', true);
		}
		var $showEle = ele.closest('li').children('.post-comment_box');
		$showEle.show().find('.input-con').focus();
	}

	//收起评论框
	function hideCommentBox(ele) {
			var $showEle = ele.closest('li').children('.post-comment_box');
			$showEle.hide().find('.input-con').blur();
			ele.hide().prev().show();

		}
		//回复帖子

	function postSubmit(tid, ele) {
			postEle = ele;
			var $ele = ele.closest('.quick-submit_wrapper').prev('.input-con');
			var con = $ele.val().trim();
			if (!con) {
				$ele.focus();
				return;
			}
			if (ele.data('repeat')) {
				return;
			}
			ele.data('repeat', true);
			obj.quick_con = replace_em(con);
			ele.text('提交中...').css('cursor', 'not-allowed');
			$.getJSON('test6', {
				con: con,
				tid: tid
			}).done(
				function(data) {
					quickTip('评论成功');
					$ele.val('');
					var $number = postEle.closest('li').find('.post-comment')
					numAdd($number);
					// 下方的if是为了查看所有对话时回复框出现而设
					if (postEle.closest('.ui-dialog')[0]) {
						return;
					}
					obj.quick_cId = data.cId;
					addComment('single', postEle);
				}).always(function() {
				ele.text('评论').css('cursor', 'pointer').data('repeat', false);

			});
		}
		//回复评论
	function commentSubmit(tid, ele) {
		commentEle = ele;
		var con = ele.closest('.quick-submit_wrapper').prev('.input-con').val().trim();
		if (!con) {
			ele.closest('.quick-submit_wrapper').prev('.input-con').focus();
			return;
		}
		if (ele.data('repeat')) {
			return;
		}
		ele.data('repeat', true);
		ele.text('提交中...').css('cursor', 'not-allowed');
		obj.quick_con = replace_em(con);
		$.getJSON('test6', {
			con: con,
			tid: tid
		}).done(
			function(data) {
				obj.quick_cId = data.cId;
				obj.quick_diaId = data.diaId;
				quickTip('评论成功');
				var $number = commentEle.closest('.post-item').find('.post-comment')
				numAdd($number);
				ele.closest('.quick-submit_wrapper').prev('.input-con').val('');
				ele.closest('.quick-comment_wrapper').find('.quick-replay_btn').click();
				addComment(' ', commentEle);
			}).always(function() {
			ele.text('评论').css('cursor', 'pointer').data('repeat', false);

		});
	}

	//删除评论

	function deleteComment(tid, ele) {
		deleteEle = ele.closest('.post-item').find('.post-comment');
		var $wrapper = ele.closest('li');
		var d = dialog({
			skin: 'select-dialog',
			title: '提示',
			content: '你确定删除此条评论',
			okValue: '确定',
			ok: function() {
				$.getJSON('test', {
					id: tid
				}).done(function() {
					quickTip('删除评论成功');
					numMinus(deleteEle);
					$wrapper.remove();
				})
			},
			cancelValue: '取消',
			cancel: function() {}
		});
		d.show();
	}

	//下一页评论的加载
	function allcomment(id, ele) {
		$.getJSON('test7', {
			id: id
		}).done(function(data) {
			$ele = ele.closest('.post-item');
			var tpl = template('comment-list', data);
			$ele.find('.quick-comment_list ul').append(tpl);
			ele.remove();
		})
	}

	//举报评论

	function reportPost(id, ele) {
		var html = getTpl('reportTpl');
		var d = dialog({
			skin: 'my-post',
			width: 560,
			title: '举报',
			content: html,
			ok: function() {
				var ischecked = $('.spam_type input:checked')[0];
				if (!ischecked) {
					$('.reportPost-tip').show();
					return false;
				}
				var value = ischecked.value;
				$.ajax({
					url: 'test',
					data: {
						value: value,
						cid: id
					},
					dataType: 'json'
				}).done(function() {
					quickTip('举报成功');
				});
			},
			okValue: "确定",
			cancel: function() {},
			cancelValue: "取消"
		});
		d.showModal();
	}

	$(function() {

		$('.emotion').each(function() {
			$(this).qqFace({
				id: 'facebox', //表情盒子的ID
				assign: 'con-wrapper', //给那个控件赋值
			});
		})


		$(document)
			.on('click', '.hug', function() { //喜欢
				if (isLogin()) {
					var $ele = $(this);
					var topicId = $ele.closest('li').data('id');
					loveTopic(topicId, $ele);
				} else {
					require.async('login', function(login) {
						login.init();
					})
				}
			})
			.on('click', '.repost', function() { //转发
				if (isLogin()) {

					var $ele = $(this);
					var topicId = $ele.closest('li').data('id');
					repostTopic(topicId, $ele);
				} else {
					require.async('login', function(login) {
						login.init();
					})
				}
			})
			.on('click', '.collect', function() { //收藏
				if (isLogin()) {
					var $ele = $(this);
					var topicId = $ele.closest('li').data('id');
					collectTopic(topicId, $ele);
				} else {
					require.async('login', function(login) {
						login.init();
					})
				}
			})
			.on('click', '.un-collect', function(e) {
				e.preventDefault();
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				unCollectTopic(topicId, $ele);
			})
			.on('click', '.post-comment', function() { //查看评论
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				showCommentBox(topicId, $ele);
			})
			.on('click', '.post-comment_up', function() { //收起评论
				var $ele = $(this);
				hideCommentBox($ele);
			})
			.on('click', '.post_submit_btn', function() { //回复帖子
				if (isLogin()) {
					var $ele = $(this);
					var topicId = $ele.closest('li').data('id');
					postSubmit(topicId, $ele);
				} else {
					require.async('login', function(login) {
						login.init();
					})
				}

			})
			.on('click', '.comment_submit_btn', function() { //回复评论
				if (isLogin()) {
					var $ele = $(this);
					var topicId = $ele.closest('li').data('id');
					commentSubmit(topicId, $ele);
				} else {
					require.async('login', function(login) {
						login.init();
					})
				}
			})
			.on('click', '.quick-replay_btn', function(e) { //弹出快速回复窗
				e.preventDefault();
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				quickComment(topicId, $ele);
			})
			.on('click', '.delete-comment', function(e) { //删除自己的评论
				e.preventDefault();
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				deleteComment(topicId, $ele);
			})
			.on('click', '.nextPage-comment_btn', function(e) { //加载下一页数据
				e.preventDefault();
				var $ele = $(this);
				var topicId = $ele.data('next');
				allcomment(topicId, $ele)
			})
			.on('click', '.see-all_dialog', function(e) { //查看所有对话
				e.preventDefault();
				var $ele = $(this);
				var topicId = $ele.data('diaid');
				seeAll(topicId, $ele)
			})
			.on('click', '.reportPost,.reportComment', function(e) { //举报帖子
				e.preventDefault();
				var $ele = $(this);
				var topicId = $ele.closest('li').data('id');
				reportPost(topicId, $ele)
			})
			.on('click', '.post-item_pro .post-expand', function() { //帖子展开
				var $ele = $(this).closest('.post-item_pro');
				$ele.hide();
				$ele.next().show();
			})
			.on('click', '.post-item_pro .post-packUp', function() { //帖子收起
				var $ele = $(this).closest('.post-item_pro');
				$ele.hide();
				$ele.prev('.post-item_pro').show();
			})
	});


	function initPagination(page) {
		$('#pagination').twbsPagination({
			totalPages: page,
			visiblePages: 8,
			first: "第一页",
			last: "最后一页",
			prev: "上一页",
			next: "下一页",
			onPageClick: function(event, page) {
				loadData(cat,0, page);
				isScrolled = 0;
				$('#pagination').hide();
				$('html,body').animate({
					'scrollTop': 0
				}, 500, function() {
					
				})
			}
		});
	}

	initPagination(OP_CONFIG.totalPages);

		//tab切换
		$('.tab-hd .tag-cat').click(function  (e) {
			e.preventDefault();
			if ($(this).hasClass('J-selected')) {
				return;
			}
			
			var index = $(this).index();
			$('.tab-hd .J-selected').removeClass('J-selected');
			$(this).addClass('J-selected');
			$('.tab-bd .show').removeClass('show');
			$('.tab-bd .tab-item').eq(index).addClass('show');
			$('.tab-item.show .tag-item').eq(0).click();

		});

	$(document).on('click', '.timeline-cat .cat-item', function(e) {
		e.preventDefault();
		var $ele = $(this);
		 cat = $ele.data('id');
		if ($ele.hasClass('J-selected')) {
			return;
		}
		isScrolled = 0;
		eventName = 'click';

		$('.timeline-cat .J-selected').removeClass('J-selected');
		$ele.addClass('J-selected');

		if (cat == "tag") {
			$('.tag-select-wrapper').show();
			$('.tag-cat_wrapper .tag-cat').eq(0).click();
		} else {
			$('.tag-select-wrapper').hide();
		}

		loadData(cat);
	});

	var isAjax = 0;
	var Page = 1;
	var isScrolled = 0;
	var second = 1;
	var cat = 'tag';
	var eventName = 'scroll'
	var resetLoading = function() {
		$(".bg-loading").css({
			height: $(".my-post").height()
		})
	}

	var showLoading = function() {
		var h = $(".my-post").height() + 5;

		if ($(".bg-loading").length == 0) {

			$(".my-post").prepend('<div class="bg-loading"></div>')
		}

		$(".bg-loading").css({
			height: h
		}).fadeIn(100);
	}

	var hideLoading = function() {
		isAjax = 0
		setTimeout(function() {
			$(".bg-loading").fadeOut(300);
		}, 0)
	}


	var setFixed = function() {

		if (isScrolled) {
			return;
		}
		var t = $(document).scrollTop();
		var h = $(document).height()
		var wh = $(window).height()
		if (t >= h - wh - 50) {
			var cat = $('.cat-item.J-selected').data('id');
			loadData(cat, 1, Page);
		}
	}

	function loadData(cat, second, page) {
		if (isAjax) {
			return;
		}

		if (second == 1) {
			$(".my-post").append('<a href="javascript:void(0)" class="js-next"></a>')
		} else {
			showLoading()
		}

		if (cat == 'tag') {
			var url = 'test3';
			var id = $('.tag-wrapper.show .J-selected').data('id');
			var data = {
				page: page,
				id: id,
				second: second
			}
		} else if (cat == "follow") {

			var url = 'xxx';
			var id = "follow";
			var data = {
				page: page,
				id: id,
				second: second
			}
		} else {
			var url = 'xxx';
			var id = "doc-ans";
			var data = {
				page: page,
				id: id,
				second: second
			}
		}

		isAjax = 1;

		$.ajax({
			url: url,
			data: data,
			method: "post",
			dataType: "json",
		}).done(function(data) {

			isAjax = 0;
			var html = template('post-list', data);
			
			if (second == 0) {
				
				hideLoading()
				$('.my-post').html(html);
				second = 1;

				if (eventName == 'click') {
					$('#pagination').empty().removeData("twbs-pagination").unbind("page");
					initPagination(data.page);
				}


			} else {
				$('.js-next').remove();
				$('.my-post').append(html);
				console.log('test');
				$('#pagination').show();
				isScrolled = 1;
			}
		})
	}


	if (OP_CONFIG.page == "index") {
		$(window).scroll(setFixed);
	}

	$(document).on('click', '.tag-item', function(e) {

		e.preventDefault();
		eventName = 'click';
		var $ele = $(this),
			id = $ele.data('id');
		if ($ele.hasClass('J-selected')) {
			return;
		}
		isScrolled = 0;
		$('.tag-item.J-selected').removeClass('J-selected');
		$ele.addClass('J-selected');
		$('#pagination').hide();
		loadData('tag',0, 1);

	})
})
define(function(require, exports, module) {
	var imgupload = require('imgupload');
	var common = require('./common');
	var post = require('post-handle');
	var atwho = require('atWho').atWho;
	var template = require('template');
	var initPagination = require('page');
	require('autosize');

	//@他人
	var obj = $(".con-wrapper")
	atwho(obj);

	//图片上传
	var uploadObj = {
		url: 'test'
	}
	imgupload.imgupload(uploadObj);

	//下一页
	function Pagecallback(event, page) {
		isScrolled = 0;
		second = 0;
		$('#pagination').hide();
		$('body').scrollTop(0);
		loadData(cat, page);
	}

	initPagination(OP_CONFIG.totalPages, Pagecallback);
	$('#pagination').hide();

	//提示框
	function quickdialog(con) {
		var d = common.dialog({
			content: con
		});
		d.show();
		setTimeout(function() {
			d.close().remove;
		}, 1000);
	}

	//帖子添加到首页
	function addPost(data) {
		var htmltem = template('post-list', data);
		var $ele = $('<div id="template-post" style="display:none;"></div>').append(htmltem);
		$('body').append($ele);
		var html = $('#template-post ul').html();
		$('#template-post').remove();
		return html;

	}

	//图片重置
	function resetimg() {
		imgupload.reset();
		$('.editor-post_footer .upload-img').show();
		$('.img-upload_box').css({
			'height': 0,
			'overflow': 'hidden'
		});
	}

	//发布框重置
	function resetShareBox(data) {

		$('.my-shareBox .clicked').hide();
		$('.my-shareBox .un-clicked').show();
		var html = addPost(data);
		$('.editor-post_group .J-clicked').removeClass('J-clicked');
		$('.editor-post_title input').val('');
		$('.editor-post_con .con-wrapper').val('');
		$('.btn-submit').data('repeat', false);
		$('.group-tip').hide();
		if ($('.queueList li').length) {
			resetimg();
		}
		$('.btn-submit').data('cat', ' ');
		$('.tip-doc').show();
		$('.tip-share').hide();
	}

	$(function() {

		//签到
		$('.my-checkIn_box').click(function() {
			var $text = $(this).find('.check-tip');
			if ($text.data('checked')) {
				return;
			}
			var date = parseInt($('.check-num').data('num')) + 1;
			$text.data('checked', true);
			$('.check-num .num').text(date);
			$('.check-tip').text('已签到');
		})

		//点击表情 图片时弹出发帖框
		$('.editor-post_footer .emotion,.editor-post_footer .upload-img,.editor-post_footer .changwen').click(function() {
			$('.my-shareBox .un-clicked').click();
		})

		//弹出主评论框
		$('.my-shareBox .un-clicked').click(function(e) {
			e.preventDefault();
			//判断是否为小组页面  告知加入才可发帖
			if (OP_CONFIG.module == 'group') {
				if ($('.group-btn').hasClass('add-follow')) {

					quickdialog('发帖需要先加入该小组');
					return;
				}
			}
			$(this).hide();
			$('.my-shareBox .clicked').show();
			$('.toDoc-wrapper').show();
			$('.submit-wrapper .btn-cancel').show();

			//主评论框高度自适应
			$('#content-input').autosize();
		})



		//标签 小组expand
		$('.tag-cat_wrapper .expand,.tag-wrapper .expand').click(function(e) {
			e.preventDefault();
			$(this).hide();
			$(this).prevAll('.hide').removeClass('hide');
		});



		//主评论框确认

		$('.btn-submit').click(function(e) {
			e.preventDefault();
			var data = {};
			var url = ''; //后台补充 为帖子的后台地址
			if ($(this).data('repeat') == true) {
				return;
			}
			var postTitle = $('.editor-post_title input').val().trim(),
				postCon = $('.editor-post_con .con-wrapper').val().trim(),
				isSelectGroup = 1;
			if ($('.editor-post_group').length) {
				isSelectGroup = $('.editor-post_group .group-item').hasClass('J-clicked');
			}

			if (!isSelectGroup) {
				$('.group-tip').show();
				return;
			}
			if (!postTitle) {
				$('.editor-post_title input').focus();
				quickdialog('请输入标题');
				return;
			}
			if (!postCon) {
				$('.editor-post_con .con-wrapper').focus();
				quickdialog('请输入内容');
				return;
			}

			var postGroup = $('.editor-post_group .J-clicked').data('id');
			var toDoc = $('#toDoc').prop('checked');
			$(this).data('repeat', true);
			data.postGroup = postGroup;
			data.postTitle = postTitle;
			data.postCon = postCon;
			data.toDoc = toDoc;
			data.imgList = imgupload.imgList;

			if ($(this).data('cat') == 'doc-ask') {
				url = '' //此处url为医生提问的地址，
				data.docId = $('.doc-ask.active').data('id');
			}
			$.getJSON(url, data).done(function(data) {

				quickdialog('发帖成功');
				resetShareBox(data);

			})
		})

		$('.doctor-answer .bd').on('click', '.doc-ask', function(e) {
			e.preventDefault();
			resetShareBox();
			$('.doc-ask').removeClass('active');
			$(this).addClass('active');
			$('.btn-submit').data('cat', 'doc-ask');
			$('.tip-doc').hide();
			$('.tip-share').show();
			$('.changwen').click();
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


		$('.refresh').click(function(e) {
			var url = '';
			e.preventDefault();
			$.getJSON('test2').done(function(data) {
				var html = template('doc-ask', data);
				$('.doctor-answer .bd').html(html);
			});
		});


		$(document)
			.on('click', '.group-item', function() { //选择小组逻辑
				$('.group-item').removeClass('J-clicked');
				$(this).addClass('J-clicked');
				$('.group-tip').hide();
			})
			.on('click', '.upload-img', function() { //上传图片
				$('.img-upload_box').css({
					'height': "auto",
					'border-top': "1px dotted #bbb",
					'padding-top': 20
				});

				$('input[type="file"]').click();
			})
			.on('click', '.pic-add-btn', function(e) {
				$('input[type="file"]').click();
			})
			.on('click', '.changwen', function(e) {
				$('.header,.my-box,.my-recommend,.my-timeline,#pagination,.sider,.footer').hide();
				$('body').css({
					'padding-top': '0',
					'background': '#f5f5f5'
				});

				$('.my-middle .cleft').css({
					'width': 'auto',
					'float': 'none',
					'padding-top': '50px',
					'background': "#fff"
				});

				$('.my-shareBox .editor-post_footer').css({
					'position': 'fixed',
					'top': '10px',
					'width': '970px',
					'margin': '0 auto 10px',
					'left': 0,
					'right': 0,
					'background': '#fff',
					'padding-bottom': "10px",
					'border-bottom': '1px solid #999'
				});

				$('.my-shareBox .editor-content').css({
					'border': 'none'
				});

				$('#content-input').addClass('cw');
				$(this).hide().next().show();
				$('body').scrollTop(0);

			})
			.on('click', '.cw-back', function() {
				$('.header,.my-box,.my-recommend,.my-timeline,#pagination,.sider,.footer').show();
				$('body').css({
					'padding-top': '65px',
					'background': '#fff'
				});

				$('.my-middle .cleft').css({
					'width': '753px',
					'float': 'left',
					'padding-top': '0',
					'background': "none"
				});

				$('.my-shareBox .editor-post_footer').css({
					'position': 'static',
					'width': 'auto',
					'background': 'none',
					'padding-bottom': "0",
					'border-bottom': 'none'
				});

				$('.my-shareBox .editor-content').css({
					'border': '1px solid #d8d8d8'
				});

				$('#content-input').removeClass('cw');
				$(this).hide().prev().show();
			})
	})

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

			$(".my-post .post-bd").prepend('<div class="bg-loading"></div>')
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
		console.log(t);
		if (t >= h - wh - 150) {
			var cat = $('.cat-item.J-selected').data('id');
			loadData(cat, Page);
			isScrolled = 1;
		}
	}



	function loadData(cat,page) {
		if (isAjax) {
			return;
		}

		if (second == 1) {
			$(".my-post .post-bd").append('<a href="javascript:void(0)" class="js-next"></a>')
		} else {
			showLoading()
		}

			var url = 'test3';
			var id = $('.tag-wrapper.show .J-selected').data('id');
			var data = {
				page: page,
				id: id,
				second: second,
				cat:cat
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
				$('.my-post .post-bd').html(html);
				second = 1;

				if (eventName == 'click') {
					$('#pagination').empty().removeData("twbs-pagination").unbind("page");
					initPagination(data.page, Pagecallback);
					eventName = '';

				}

			} else {

				$('.js-next').remove();
				$('.my-post .post-bd').append(html);
				$('#pagination').show();
				isScrolled = 1;
				second = 0;
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
		$('.tag-item.J-selected').removeClass('J-selected');
		$ele.addClass('J-selected');
		$('#pagination').hide();
		second = 0;
		isScrolled = 0;
		loadData('tag', 1);

	})

	$(document).on('click', '.timeline-cat .cat-item', function(e) {
		e.preventDefault();
		var $ele = $(this);
		cat = $ele.data('id');
		isScrolled = 0;
		second = 0;
		eventName = 'click';
		$('.timeline-cat .J-selected').removeClass('J-selected');
		$ele.addClass('J-selected');

		if (cat == "tag") {
			$('.tag-select-wrapper').show();
			$('.tag-cat_wrapper .tag-cat').eq(0).click();
		} else {
			$('.tag-select-wrapper').hide();
			loadData(cat,1);
		}

	});

	$(document).on('click','.tag-cat_wrapper .tag-cat',function (e){
		e.preventDefault();
		var index = $(this).index();
		$('.tag-select-wrapper .tag-cat').removeClass('J-selected').eq(index).addClass('J-selected');
		$('.tag-select-wrapper .tab-item').removeClass('show').eq(index).addClass('show');
		$('.tag-select-wrapper .tab-item:visible .tag-item').eq(0).click();
	})
})

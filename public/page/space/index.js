define(function(require, exports, module) {
	var imgupload = require('imgupload');
	var common = require('./common');
	var post = require('post-handle');
	var atwho = require('atWho').atWho;
	require('autosize');

	//@他人
	var obj = $(".con-wrapper")
	atwho(obj);

	//图片上传
	var uploadObj ={
		url:'test'
	}
	imgupload.imgupload(uploadObj);

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

		$('.editor-post_footer').click(function() {
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
				return;
			}
			if (!postCon) {
				$('.editor-post_con .con-wrapper').focus();
				return;
			}
			var postGroup = $('.editor-post_group .J-clicked').data('id');
			var toDoc = $('#toDoc').prop('checked');
			$(this).data('repeat', true);
			$.getJSON('test', {
				postGroup: postGroup,
				postTitle: postTitle,
				postCon: postCon,
				toDoc: toDoc,
				imgList: imgList
			}).done(function() {
				$('.editor-post_group .J-clicked').removeClass('J-clicked');
				$('.editor-post_title input').val('');
				$('.editor-post_con .con-wrapper').val('');

				$('.btn-submit').data('repeat', false);
				$('.group-tip').hide();
				$('.queueList').html('');
				if (uploader) {
					uploader.reset();
				}
				$('.editor-post_con .con-wrapper').css('height', 100);
			}).fail(function() {

			})
		})


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
					'padding-bottom':"10px",
					'border-bottom':'1px solid #999'
				});

				$('.my-shareBox .editor-content').css({'border':'none'});

				$('#content-input').addClass('cw');
				$(this).hide().next().show();

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
					'padding-bottom':"0",
					'border-bottom':'none'
				});

				$('.my-shareBox .editor-content').css({'border':'1px solid #d8d8d8'});

				$('#content-input').removeClass('cw');
				$(this).hide().prev().show();
			})
	})
})
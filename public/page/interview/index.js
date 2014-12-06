define(function  (require,exports,module) {
	var imgupload = require('imgupload');
	var post = require('post-handle');
	var atwho = require('atWho').atWho;
	var template = require('template');
	var initPagination = require('page');
	var dialog = require('dialog');
	require('autosize');
	$('#content-input').autosize();
	var imgupload = require('imgupload');
	//@他人
	var obj = $(".con-wrapper");
	atwho(obj);

	//图片上传
	var uploadObj ={
		url:'test'
	}

	imgupload.imgupload(uploadObj);

	var resetLoading = function() {
		$(".bg-loading").css({
			height: $(".my-post").height()
		})
	}

	function quickDialog (con) {
		var  d = dialog({content:con});
		d.show();
		setTimeout(function  () {
			d.close().remove();
		},1000)
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
		setTimeout(function() {
			$(".bg-loading").fadeOut(300);
		}, 0)
	}
	//下一页
	function Pagecallback(event,page){
		var url = $('.timeline-cat .J-selected').data('url');
		var tem = $('.timeline-cat .J-selected').data('template');
		$('html,body').animate({
				'scrollTop': 0
			}, 200, function() {

			});
		showLoading();
		$.getJSON(url,{page:page}).done(function(data){
			console.log(data);
			var htmltem = template(tem,data);
			
			hideLoading()
			$('.my-post ul').html(htmltem);
		})
	}

	initPagination(OP_CONFIG.totalPages,Pagecallback);
	if (OP_CONFIG.totalPages <= 1) {
		$('#pagination').hide();
	}

	//帖子添加到首页
	function addPost(data){
		var htmltem = template('patient-ask-template',data);
		$('.my-post .post-bd ul').prepend(htmltem);
	}

	//图片重置
	function resetimg(){
		imgupload.reset();
		$('.editor-post_footer .upload-img').show();
		$('.img-upload_box').css({
			'height':0,
			'overflow':'hidden'
		});
	}

	//发布框重置
	function resetShareBox(data){
		var html = addPost(data);
		var data = $('.editor-post_con .con-wrapper').data('placeholder');
		$('.editor-post_con .con-wrapper').val(data);
		$('.btn-submit').data('repeat', false);
		if ($('.queueList li').length) {
			resetimg();
		}
	}

	$('.btn-submit').click(function(e) {
			e.preventDefault();
			if ($(this).data('repeat') == true) {
				return;
			}
			var postCon = $('.editor-post_con .con-wrapper').val().trim();
			var originalpostCon = $('.editor-post_con .con-wrapper').data('placeholder').trim();


			if (!postCon||postCon == originalpostCon) {
				$('.editor-post_con .con-wrapper').focus();
				quickDialog('请填写问题后再发布');
				return;
			}

			$(this).data('repeat', true);
			$.getJSON('test3', {
				postCon: postCon,
				imgList: imgupload.imgList

			}).done(function(data) {

				resetShareBox(data);

			})
		})

	$(document)
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

})
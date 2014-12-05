define(function  (require,exports,module) {
	require('post-handle');
	$('#content-input').autosize();
	var imgupload = require('imgupload');
	//@他人
	var obj = $(".con-wrapper")
	atwho(obj);

	//图片上传
	var uploadObj ={
		url:'test'
	}

	imgupload.imgupload(uploadObj);

	//下一页
	function Pagecallback(event, page) {
			loadData(cat, 0, page);
			isScrolled = 0;
			$('#pagination').hide();
			$('html,body').animate({
				'scrollTop': 0
			}, 500, function() {

			})
		}

	initPagination(OP_CONFIG.totalPages,Pagecallback);
	if (OP_CONFIG.totalPages <= 1) {
		$('#pagination').hide();
	}

	//帖子添加到首页
	function addPost(data){
		var htmltem = template('post-list',data);
		var $ele = $('<div id="template-post" style="display:none;"></div>').append(htmltem);
		$('body').append($ele);
		var html = $('#template-post ul').html();
		$('#template-post').remove();
		return html;

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
	}

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
			$.getJSON('test', {

				postGroup: postGroup,
				postTitle: postTitle,
				postCon: postCon,
				toDoc: toDoc,
				imgList: imgupload.imgList

			}).always(function(data) {

				resetShareBox(data);

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
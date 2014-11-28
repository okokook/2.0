define(function  (require,exports,module) {
	var common  = require('./common');
	var WebUploader = require('webuploader');
	var qqFace = require('qqFace');

	//表情替换
	function replace_em(str){
		str = str.replace(/\</g,'&lt;');
		str = str.replace(/\>/g,'&gt;');
		str = str.replace(/\n/g,'<br/>');
		str = str.replace(/\[em_([0-9]*)\]/g,'<img src="images/face/$1.gif" border="0" />');
		return str;
	}

	$(function  () {

		$('.emotion').each(function  () {
			$(this).qqFace({
				id : 'facebox', //表情盒子的ID
				assign:'con-wrapper', //给那个控件赋值
			});
		})

		$('.msg-dialogue').on('click','.msg_ctrl',function  (e) {
			e.preventDefault();
			var that = this;
			var d = common.dialog({
				title:'提示',
				content:'要将这条私信删除吗？',
				ok: function () {
			       $.getJSON('test1').done(function  () {
			       		$(that).parents('.msg_dialogue_list').remove();
			       })
			    },
			    okValue:'确定',
			    cancel: function  () {},
			    cancelValue:"取消"
			})
			d.showModal();
		});

		$('.send_private_msg .btn_s').click(function  (e) {
			e.preventDefault();
			var $input = $('.send_private_msg textarea');
			var con = $input.val().trim();
			if (!con) {$input.focus()}
				else{
					data.con=con;
					$.getJSON('test',{con:con}).done(function () {
						var html = common.template('msg-add_template',data);
						$('.msg-dialogue').prepend(html);
						$input.val('');
					});
				}
		});
		
		var thumbnailWidth = 70 ,thumbnailHeight = 70 ;
		// 初始化Web Uploader
		var uploader = WebUploader.create({

		    swf: 'public/component/base/webuploader/Uploader.swf',

		    auto:true,
		    fileNumLimit:8,
		    fileSingleSizeLimit:1*1024*1024,

		    // 文件接收服务端。
		    server: 'http://webuploader.duapp.com/server/fileupload.php',

		    pick: '#filePicker',
		    // 只允许选择图片文件。
		    accept: {
		        title: 'Images',
		        extensions: 'gif,jpg,jpeg,bmp,png',
		        mimeTypes: 'image/*'
		    }
		});

		// 当有文件添加进来的时候
		uploader.on( 'fileQueued', function( file ) {
		    var $li = $(
		            '<li id="' + file.id + '" class="file-item thumbnail">' +
		                '<img>' +
		                '<div class="info">' + file.name + '</div>' +
		            '</li>'
		            ),
		        $img = $li.find('img');


		    // $list为容器jQuery实例
		    $('.queueList').append( $li );

		    // 创建缩略图
		    // 如果为非图片文件，可以不用调用此方法。
		    // thumbnailWidth x thumbnailHeight 为 100 x 100
		    uploader.makeThumb( file, function( error, src ) {
		        if ( error ) {
		            $img.replaceWith('<span>不能预览</span>');
		            return;
		        }

		        $img.attr( 'src', src );
		    }, thumbnailWidth, thumbnailHeight );
		});

		// 文件上传过程中创建进度条实时显示。
		uploader.on( 'uploadProgress', function( file, percentage ) {
		    var $li = $( '#'+file.id ),
		        $percent = $li.find('.progress span');

		    // 避免重复创建
		    if ( !$percent.length ) {
		        $percent = $('<p class="progress"><span></span></p>')
		                .appendTo( $li )
		                .find('span');
		    }

		    $percent.css( 'width', percentage * 100 + '%' );
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		uploader.on( 'uploadSuccess', function( file ) {
		    $( '#'+file.id ).addClass('upload-state-done');
		});

		// 文件上传失败，显示上传出错。
		uploader.on( 'uploadError', function( file ) {
		    var $li = $( '#'+file.id ),
		        $error = $li.find('div.error');

		    // 避免重复创建
		    if ( !$error.length ) {
		        $error = $('<div class="error"></div>').appendTo( $li );
		    }

		    $error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		uploader.on( 'uploadComplete', function( file ) {
		    $( '#'+file.id ).find('.progress').remove();
		});

		 //上传图片
		 $(document).on('click','.upload-img',function  () {
		 			$('.img-upload_box').css({'height':"auto",'padding-top':20});
		 			$('input[type="file"]').click();
		 })


	})
})

define(function  (require,exports,module) {
	var 
	WebUploader = require('webuploader'),
	dialog = require('dialog'),
	data ={};

	data.item = [];
	data.date = '';

	function quickDialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000)
	}

	function htmlptl (data) {
		var 
		array = data.list,
		html="";
		for (var i = 0; i < array.length; i++) {
			html+='<input type="text" data-id="'+array[i].id+'" id="item-'+i+'" placeholder="'+array[i].name+'">';
		}
		return html;
	}

	function check () {
		$('.tab-second input[type="checkbox"]:checked').each(function  () {
			data.item.push($(this).data('id'));
		});
		if (!data.item.length) {
			quickDialog('请选择症状');
			return;
		}
		data.con = $('#add-con').val();
		if (data.con.length == 0) {
			quickDialog('请输入症状处理方法');
			$('#add-con').focus();
			return;
		}
		if (data.date=='') {
			quickDialog('请添加时间');
			return;
		}
		return true;
	}

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
	 $(document).on('click','.add-pic',function  () {
	 			$('.img-upload_box').css({'height':"auto",'padding-top':20});
	 })

	 //切换
	 $('.expand').click(function  (e) {
	 	e.preventDefault();
	 	$(this).closest('.short-wrapper').hide();
	 	$(this).closest('.short-wrapper').next('.expand-wrapper').show();
	 })

	 $('.short').click(function  (e) {
	 	e.preventDefault();
	 	$(this).closest('.expand-wrapper').hide();
	 	$(this).closest('.expand-wrapper').prev('.short-wrapper').show();
	 })
	 
	//标签切换

	$('.tab-first .tag-cat').click(function  (e) {
		e.preventDefault();
		var 
		$ele = $(this),
		id = $ele.data('id');
		data.cat = id;
		if ($ele.hasClass('J-selected')) {
			return;
		}
		$('.tag-cat.J-selected').removeClass('J-selected');
		$ele.addClass('J-selected');
		$.getJSON('test',{'id':id}).done(function  (data) {
			var html = htmlptl(data);
			$('.tab-item').html(html);
		})
	})

	//保存
	$('.save').click(function  (e) {
		e.preventDefault();
		if (check()) {
			$.getJSON('test',{'data':data}).done(function  () {
				quickDialog('添加成功');
			})
		}
	})
})
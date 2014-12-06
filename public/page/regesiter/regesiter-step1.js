define(function  (require,exports,module) {
		var dialog = require('dialog');
		var WebUploader = require('webuploader');
		require('imgareaselect');
		require('distpicker');
		var imgarea = '',
			isAjax = 0,
			data = {};

		function quickdialog (con) {
			var d = dialog({
				content:con
			});
			d.show();
			setTimeout(function () {
				 d.close().remove();
			},1000);
		}

		function preview(img, selection) {
		    if (!selection.width || !selection.height)
		        return;
		    
		    var scaleX = 200 / selection.width;
		    var scaleY = 200 / selection.height;
		    var imgWidth = $('#photo img').width();
		    var imgHeight = $('#photo img').height();
		    $('#preview img').css({
		        width: Math.round(scaleX * imgWidth),
		        height: Math.round(scaleY * imgHeight),
		        marginLeft: -Math.round(scaleX * selection.x1),
		        marginTop: -Math.round(scaleY * selection.y1)
		    });
			data.sx1 = selection.x1;
	    	data.sy1 = selection.y1;
		    data.sx2 = selection.x2;
		    data.sy2 = selection.y2;
		    data.sw = selection.width;
		    data.sh = selection.height;
			data.iw = $('#preview img').width();
			data.ih = $('#preview img').height();	    

		}

		$(function  () {
			var uploader = WebUploader.create({
			    // swf文件路径
			    swf: 'public/component/base/webuploader/Uploader.swf',
			    // 文件接收服务端。
			    server: 'xxx',
			    pick: '#upload-btn',
			    thumb:{
			    	width:300,
			    	height:300,
			    	crop:false
			    },
			    // 只允许选择图片文件。
			    accept: {
			        title: 'Images',
			        extensions: 'gif,jpg,jpeg,bmp,png',
			        mimeTypes: 'image/*'
			    }
			});
			uploader.on( 'fileQueued', function( file ) {
				$('#photo-wrapper').show();
				$('.save').show();
			    var $img = $('#photo img');
			    uploader.makeThumb( file, function( error, src ) {
			        if ( error ) {
			            $img.replaceWith('<span>浏览器不支持，请换用高级浏览器</span>');
			            return;
			        }
			        $img.attr( 'src', src );
			        $('#preview img').attr("src",src);
			        imgarea = $('#photo').imgAreaSelect({ aspectRatio: '1:1', handles: true,
			                        fadeSpeed: 200, onSelectChange: preview ,x1: 0, y1: 0, x2: 200, y2: 200 });
			    }, 300,300);

			});

			

			$('.save').click(function  (e) {
				e.preventDefault();
				if (isAjax == 1) {
					return;
				}

				data.sex = $('input[name="gender"]:checked').val();
				data.province = $('#province').val();
				data.city = $('#city').val();
				data.district = $('#district').val();
				data.instro = $('.text-large').val();
				data.address = $('#address').val();

				$(this).val('保存中..');
				isAjax = 1;
				uploader.upload();
				$.getJSON('url',data).done(function	(){
					window.location.href="regesiter-step2.html"
				}).fail(function  () {
					quickdialog('保存失败，请刷新重试');
				}).always(function  () {
					isAjax = 0;
					$('.save').val('保存');
				})
			})
		})
})
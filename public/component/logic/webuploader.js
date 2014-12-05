define(function(require, exports, module) {
	var WebUploader = require('webuploader');
	var fileCount = 0,imgList = [];

	function picupload(data) {
	var 
		thumbnailWidth = 70,
		thumbnailHeight = 70;

	// 初始化Web Uploader
	var uploader = WebUploader.create({

		swf: 'public/component/base/webuploader/Uploader.swf',
		auto: true,
		fileNumLimit: 8,
		fileSingleSizeLimit: 1 * 1024 * 1024,

		// 文件接收服务端。
		server: data.url,

		pick: '#filePicker',
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		}
	});

	// 当有文件添加进来的时候
	uploader.on('fileQueued', function(file) {

		fileCount++;
		if (fileCount == 8) {
			$('.pic-add-btn').hide();
		}
		var $li = $(
				'<li id="' + file.id + '" class="file-item thumbnail">' +
				'<img>' +
				'<div class="info">' + file.name + '</div>' +
				'</li>'
			),
			$img = $li.find('img');


		// $list为容器jQuery实例
		$('.queueList').prepend($li);
		$('.upload-img').hide();
		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		uploader.makeThumb(file, function(error, src) {
			if (error) {
				$img.replaceWith('<span>不能预览</span>');
				return;
			}

			$img.attr('src', src);
		}, thumbnailWidth, thumbnailHeight);
	});

	// 文件上传过程中创建进度条实时显示。
	uploader.on('uploadProgress', function(file, percentage) {
		var $li = $('#' + file.id),
			$percent = $li.find('.progress span');

		// 避免重复创建
		if (!$percent.length) {
			$percent = $('<p class="progress"><span></span></p>')
				.appendTo($li)
				.find('span');
		}

		$percent.css('width', percentage * 100 + '%');
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on('uploadSuccess', function(file, data) {
		$('#' + file.id).addClass('upload-state-done');
		var $li = $('#' + file.id),
			$remove = $li.find('.remove');

		// 避免重复创建
		if (!$remove.length) {
			$remove = $('<div class="remove"></div>').appendTo($li);
		}
		imgList.push(data);
	});

	// 文件上传失败，显示上传出错。
	uploader.on('uploadError', function(file) {
		var $li = $('#' + file.id),
			$error = $li.find('div.error');

		// 避免重复创建
		if (!$error.length) {
			$error = $('<div class="error"></div>').appendTo($li);
		}

		$error.text('上传失败');
	});

	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on('uploadComplete', function(file) {
		$('#' + file.id).find('.progress').remove();
	});

	$(document).on('click', '.upload-state-done .remove', function() {
		var $item = $(this).closest('li');
		var id = $item.attr('id');
		uploader.removeFile(id,true);
		var index = $item.index();
		imgList.splice(index, 1);
		$item.remove();
		fileCount--;
		if (fileCount == 7) {
			$('.pic-add-btn').show();
		}
	})

	}

	function reset (){
		$('.upload-state-done .remove').click();
	}

	exports.imgupload =  picupload;
	exports.reset =  reset;
	exports.imgList = imgList;
})
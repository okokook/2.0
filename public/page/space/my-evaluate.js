define(function  (require,exports,module) {
	$(document)
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
	.on('click','')
})
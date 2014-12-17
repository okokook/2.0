define(function  (require,exports,module) {
	var initPage = require('page');
	var template = require('template');
	function loadData(data) {
		var html = template(OP_CONFIG.template,data);
		$('.post-bd ul').html(html);
	}

	function Pagecallback (event,page){
		$.getJSON(OP_CONFIG.pageURL,{page:page}).done(function (data){
			loadData(data);
			console.log(window.location.search);
		})
	}

	initPage(OP_CONFIG.totalPages,Pagecallback)
})
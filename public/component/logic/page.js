define(function(require, exports, module) {
	var Pagination = require('Pagination');

	function initPagination(page,Pagecallback) {
		$('#pagination').twbsPagination({
			totalPages: page,
			visiblePages: 8,
			first: "第一页",
			last: "最后一页",
			prev: "上一页",
			next: "下一页",
			onPageClick: Pagecallback
		});
	}
	return initPagination;
})
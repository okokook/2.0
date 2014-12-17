define(function(require, exports, module) {
	var Pagination = require('Pagination');

	function initPagination(page,Pagecallback) {
		$('#pagination').twbsPagination({
			totalPages: page,
			visiblePages: 8,
			onPageClick: Pagecallback,
		});
	}
	return initPagination;
})
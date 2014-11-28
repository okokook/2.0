define(function  (require, exports, module) {
	require('caret');
	var atwho = require('atwho');


	var atWho = function  (obj) {
			  var at_config = {
				at: "@",
				 tpl: "<li data-value='@${searchkey} '><img src='${faceurl}'  height='20' width='20' /> ${name}</li>",
				callbacks: {
					remote_filter: function(query, callback) {

						if (query == '') {
							
							$.ajax({
								url: 'test111',
								type: 'GET',
								dataType: "json",
								success: function(res) {
									console.log(res);
									if (res.data == null) {
										$('#at-view').hide();
										return;
									} else {
										console.log('test');
										datas = $.map(res.data, function(value, i) {
											return {
												'key': value.uname + ":",
												'name': value.uname,
												'faceurl': value.avatar_small,
												'searchkey':value.search_key
											}
										})
									}
									callback(datas)
								}
							})
						} else {

							$.ajax({
								url: 'test111',
								type: 'GET',
								data: query,
								dataType: "json",
								success: function(res) {
									if (res.data == null) {
										$('#at-view').hide();
										return;
									} else {
										datas = $.map(res.data, function(value, i) {
											return {
												'key': value.uname + ":",
												'name': value.uname,
												'faceurl': value.avatar_small,
												'searchkey': value.search_key
											}
										})
									}
									callback(datas)
								}
							})
						}
					}
				}
			  }
		obj.atwho(at_config);
		obj.caret('pos', 47);
		obj.focus().atwho('run');
	}

	exports.atWho = atWho;
})
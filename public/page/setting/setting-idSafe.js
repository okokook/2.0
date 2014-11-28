define(function  (require,exports,module) {
	var dialog = require('dialog');
	var validform = require('validform');
	require('placeholderfriend');
	$(function(){
		$("#idSafe").Validform({
			tiptype:function(msg,o,cssctl){
				if(!o.obj.is("form")){
					var objtip=o.obj.siblings(".Validform_checktip");
					cssctl(objtip,o.type);
					objtip.text(msg);
				}
			},
			ajaxPost:true,
			beforeSubmit:function  () {
				$('.submit').val('保存中..');
			},
			callback:function(data){
				if(data.status==true){
					var d = dialog({
						content:"修改成功"
					});
					d.show();
					setTimeout(function () {
					    d.close().remove();
					}, 1000);
					$('.submit').val('保存');
				} else{
					var d = dialog({
						content:"原始密码错误"
					});
					d.show();
					setTimeout(function () {
					    d.close().remove();
					}, 1000);
					$('.submit').val('保存');
				}
			}
		});
		
	})
})
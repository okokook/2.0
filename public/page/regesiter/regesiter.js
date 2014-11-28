define(function  (require,exports,module) {
	var Validform = require('validform');
		require('password');

			function newgdcode(obj,url) {
				obj.src = url+ '&nowtime=' + new Date().getTime();
			}

			$(function(){
				$("#login_form").Validform({
					tiptype:function(msg,o,cssctl){
					//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
						var objtip=o.obj.siblings(".Validform_checktip");
							cssctl(objtip,o.type);
							objtip.text(msg);
			
					},
				});

				$('.concent').click(function  (e) {
					e.preventDefault();
					$('.popup-loginbox_wrapper').show();
				});
				$('.login-close').click(function  (e) {
	 				e.preventDefault();

				 	$('.popup-loginbox_wrapper').hide();
				 });
			})
})
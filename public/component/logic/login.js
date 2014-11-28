define(function(require, exports, module){

	var Validform = require('validform');
	var dialog = require('dialog');

	function signupTpl () {
	/*
		<div class="login-bd_main">
			<div class="login-con">
				<form method="POST" id="login_form" action="http://www.manyoubang.com/user-login-ts-do.html">
					<ul>
						<li>
							<label class="k" for="uname">帐号：</label>
							<input type="text" id="uname" name="email" ajaxurl="test" errormsg="用户名错误" nullmsg="请输入用户名" sucmsg=" " datatype="*" placeholder="输入用户名或邮箱">
							<div class="Validform_checktip"></div>
						</li>
						<li>
							<label class="k" for="password">密码：</label>
							<input type="password" id="password" name="pwd" errormsg="密码错误" nullmsg="请输入密码" sucmsg=" " datatype="*">
							<div class="Validform_checktip"></div>
						</li>
                        <li>
                        	<label class="k"></label>
	                        <div class="login-remember cls">
							<div class="remember-checkbox">
								<input type="checkbox" name="auto_flag" id="auto_flag" checked="true">
								<label for="auto_flag" title="建议在网吧或公共电脑上取消该选项">下次自动登录</label>
								<a href="http://www.manyoubang.com/user-forgetpwd.html" class="fogot-num jbtn">忘记密码？</a>
							</div>
							</div>
                        </li>
						 <li id="submit">
							 <label class="k"></label>
							 <input type="hidden" name="jump" id="jumpval" value="http://www.manyoubang.com/group.html">
		 					 <input type="hidden" name="cktime" value="2592000">
		 					 <input type="hidden" name="token" value="1a05e156178499a8e826b7b1f96ed23c6d316516">
							 <input type="submit" value="马上登录" id="btn_reg_submit" class="btn-reg jbtn">
						</li>
						<li>
							<label class="k">
							</label>
							<div class="login-other">或使用合作网站账号登录&nbsp;:&nbsp;<a href="http://www.manyoubang.com/index.php?app=pubs&amp;ac=plugin&amp;plugin=weibo&amp;in=login" title="微博登录" class="jbtn"><i class="weibo"></i>微博</a><a href="http://www.manyoubang.com/index.php?app=pubs&amp;ac=plugin&amp;plugin=qq&amp;in=login" title="qq登录" class="jbtn"><i class="qq"></i>QQ</a></div>
						</li>
					</ul>
				</form>
			</div>
		</div>
		<div class="login-bd_side">
			<div class="hd">没有账号？</div>
			<p>加入慢友帮，获得最全面专业的慢性病治疗知识</p>
			<p><a href="http://www.manyoubang.com/user-register.html" class="jbtn">注册</a></p>
		</div>
	 */
	}
	function forgetpwdTpl () {
		/*
			
		*/
	}
	var tpl = {
	   		signup:signupTpl,
	   		forgetpwd:forgetpwdTpl
		}
	function getTpl(m){
		var r=/\/\*([\S\s]*?)\*\//m,
			m=r.exec(tpl[m].toString());
		return m&&m[1]||m;
	}
	function init (){
		var tpl = getTpl("signup");
		var d = dialog({
			content:tpl,
			title :'登录'
		});
		d.showModal();

		// 表单验证
			 $("#login_form").Validform({
			 	tiptype:function(msg,o,cssctl){
			 	//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
			 		var objtip=o.obj.siblings(".Validform_checktip");
			 			cssctl(objtip,o.type);
			 			objtip.text(msg);
			 
			 	},
			 	ajaxPost:true,
			 	callback:function  (data) {
			 		if (data.info==false) {
			 			$('#password').next('.Validform_checktip').text('密码错误');
			 		}
			 	}


			 });
	}
	module.exports = {
        init : init
    };
});
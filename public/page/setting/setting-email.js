define(function(require, exports, module){
	var dialog = require('dialog');
	function quickdialog (con) {
		var d = dialog({
			content:con
		});
		d.show();
		setTimeout(function  () {
			d.close().remove()
		},1000)
	}
	$("#verify-btn-sent").click(function(){
		var $this=$(this);
		if($this.text()=="正在发送...") return ;
		$this.text("正在发送....");
		$.ajax({
			url:"test",
			dataType:"json",
			success:function(data){
				
				if(data.status==0){
					window.location.href="/setting/setting-emailsent.html";
				}
				else{
					quickdialog(data.msg);
				}
				$this.text("发送验证邮件");
			},
			error:function(){
				quickdialog("后台出错，请稍后重试！");
				$this.text("发送验证邮件");
			}
		})

	});

});
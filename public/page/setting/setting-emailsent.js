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

	$(".sent-again span").click(function(){
		var $this=$(this);
		if($this.next().length){
			return ;
		}
		$this.after("<em>正在发送...</em>");
		$.ajax({
			url:"test",
			dataType:"json",
			success:function(data){
				if(data.status==0){
					quickdialog("验证邮件发送成功！")
				}
				else{
					quickdialog(data.msg);
				}
				$this.next().remove();
			},
			error:function(){
				quickdialog("后台出错，请稍后重试！");
				$this.next().remove();
			}
		})

	});

})
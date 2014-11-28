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
	
	function isPhone(aPhone) {
        var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
        if (bValidate) {
            return true;
        }
        else
            return false;
    }

	$(".get-verify_btn").click(function(){
		var sec = 60;
		var $this=$(this);
		var phone = $('.phone').val();
		if(!isPhone(phone)){
			$('.phone-tip').show();
			$('.phone').focus();
			return ;
		}
		$('.phone-tip').hide();
		$this.addClass('notallowed');
		$.getJSON('test',{phone:phone}).done(function  () {

		});
		setTimeout(function loop () {
			if (sec>0) {
				sec-=1;
				var str="重新获取"+sec+"秒";
				$this.text(str);
				setTimeout(loop,1000)
			} else{
				$this.text('获取验证码');
				$this.removeClass('notallowed');
			}
		},1000);
		

	});

	$('.rlf-btn-green').click(function  () {
		var qrNum = $('.qrnumber').val().trim();
		var phone = $('.phone').val();
		if(!isPhone(phone)){
					$('.phone-tip').show();
					$('.phone').focus();
					return ;
				}
		if (qrNum) {
			$.getJSON('test',{qrNum:qrNum,phone:phone}).done(function function_name (data) {
				if (data.status==0) {
					window.location.href="/setting/setting-phonesent.html";
				} else{
					quickdialog(data.status);
				}
				
			})
		} else{
			$('.r-tip').show();
			$('.qrnumber').focus();
		}
	})

})
define(function(require, exports, module){
	// QQ表情插件
		$.fn.qqFace = function(options){
			var defaults = {
				wrapper  :'edit-box_wrapper',
				id : 'facebox',
				path : '/public/component/base/qqFace/face/',
				tip : 'em_'
			};
			var option = $.extend(defaults, options);
			var $emotion = $('.'+option.id);
			var path = option.path;
			var tip = option.tip;
			var id =option.id;
			$(document).on('click','.emotion',function(e){
			var $wrapper =  $(this).parents('.'+option.wrapper);
			if ($wrapper.length) {
				assign =$wrapper.find('.'+option.assign);
			} else{
				assign = $('.clicked.edit-box_wrapper .con-wrapper');
			}
			/*if (!assign.length) {
				assign = $(this).closest('li').find('.con-wrapper');
			}*/
				var strFace, labFace;
				$emotion = $('.'+option.id);
				if($emotion.length<=0){
					strFace = '<div class="'+id+'" style="position:absolute;display:none;z-index:10000;" class="qqFace">' +
								  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
					for(var i=1; i<=75; i++){
						
						strFace += '<td><img src="'+path+i+'.gif" data-index='+i+'></td>';
						if( i % 15 == 0 ) strFace += '</tr><tr>';
					}
					strFace += '</tr></table></div>';
					$('body').append(strFace);

					$('.facebox img').click(function  () {
						var index = $(this).data('index');
						var labFace = '['+tip+index+']';
						assign.setCaret();
						assign.insertAtCaret(labFace);
					})
				}
				$emotion = $('.'+option.id);
				var offset = $(this).offset();
				var top = offset.top + $(this).outerHeight()+5;
				$emotion.css('top',top);
				$emotion.css('left',offset.left);
				$emotion.show();
				return false;
			});

			$(document).click(function(){
				$emotion.hide();
			});

		};

	jQuery.extend({ 
	unselectContents: function(){ 
		if(window.getSelection) 
			window.getSelection().removeAllRanges(); 
		else if(document.selection) 
			document.selection.empty(); 
		} 
	}); 
	jQuery.fn.extend({ 
		selectContents: function(){ 
			$(this).each(function(i){ 
				var node = this; 
				var selection, range, doc, win; 
				if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
					range = doc.createRange(); 
					range.selectNode(node); 
					if(i == 0){ 
						selection.removeAllRanges(); 
					} 
					selection.addRange(range); 
				} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
					range.moveToElementText(node); 
					range.select(); 
				} 
			}); 
		}, 

		setCaret: function(){ 
			if(!$.browser.msie) return; 
			var initSetCaret = function(){ 
				var textObj = $(this).get(0); 
				textObj.caretPos = document.selection.createRange().duplicate(); 
			}; 
			$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
		}, 

		insertAtCaret: function(textFeildValue){ 
			var textObj = $(this).get(0); 
			if(document.all && textObj.createTextRange && textObj.caretPos){ 
				var caretPos=textObj.caretPos; 
				caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
				textFeildValue+'' : textFeildValue; 
			} else if(textObj.setSelectionRange){ 
				var rangeStart=textObj.selectionStart; 
				var rangeEnd=textObj.selectionEnd; 
				var tempStr1=textObj.value.substring(0,rangeStart); 
				var tempStr2=textObj.value.substring(rangeEnd); 
				textObj.value=tempStr1+textFeildValue+tempStr2; 
				textObj.focus(); 
				var len=textFeildValue.length; 
				textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
				textObj.blur(); 
			}else{ 
				textObj.value+=textFeildValue; 
			} 
		} 
	});
})


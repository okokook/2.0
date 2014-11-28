define(function  (require,exports,module) {
	var dialog = require('dialog');
	var timer = '';
	var currIndex = -1;

		// 监听输入，获取数据
		var searchFun=function(obj){
			    var $this=obj;
				(timer) && clearTimeout( timer );
				timer=setTimeout(function(){
					if($.trim($this.val())){
						$.ajax({
							type: "POST",
							url: "test1",
							dataType:"json",
							data: {
								search_title:$.trim($this.val())
							},
							success: function(data){
								currIndex=-1;
								if(data.list.length !=0) {
									var str="";
									for(var i=0;i<data.list.length;i++){
		                                var people = data.list[i];
										var name = people.name;
		                                var link = people.link;
		                                var imgLink = people.imgLink;
										str+='<li title="'+name+'"><img src="'+imgLink+'"><span>'+name+'</span></li>';
									}
									$(".people-result").html(str).css("z-index",99999).show();
									$this.attr("data-old",$this.val());
								}else{
									$(".people-result").hide().html("");
								}
							}
						});
					}else{
						$(".people-result").hide().html("");
					}
			   },400)
			}

		var searchListen=function(){
			var objs=$(".people-result li").removeClass('curr')
			var keyword=""
			if(currIndex>-1){
				keyword=$(objs.get(currIndex)).addClass('curr').attr("title")
			}else{
				keyword=$(".keyword").attr("data-old")
			}
		}

		var addBlackList = function  (keyword) {
			$.getJSON('test',{keyword:keyword}).done(function  (data) {
				var str = '<li><a href="'+data.link+'" class="name">'+data.name+'</a><a href="" class="cancel" data-id="'+data.id+'">-移除黑名单</a><span>3秒前</span></li>';
				$('.added-list').prepend(str);
			});
		}

		$(".keyword").on(
			{'keydown': function (event) {
					(timer) && clearTimeout( timer );					  
		            switch (event.keyCode) {
		                case 13://回车
							var keyword =$.trim($(this).val());
							if(!keyword) return
							$(".people-result").hide().html("");
							currIndex=-1;
							addBlackList(keyword);
		                	return false;
		                break;
		                case 38:
		                	event.preventDefault();
		                	currIndex=currIndex>-1?currIndex-1:$(".people-result li").length-1;
		                	searchListen();
		                break;
		                case 40:
		                event.preventDefault();
		                	currIndex=currIndex<$(".people-result li").length-1?currIndex+1:-1;
		                	console.log(currIndex);
		                	searchListen();
		                break;
		                default:
		                	searchFun($(this));
		            }
	        	},
	        	'focus':function(){
	        		$(this).addClass('focus');
					if($.trim($(this).val())) {
						searchFun($(this));
					}
	        		
	        	},
	        	'blur':function(){
	        		if(!$.trim($(this).val())) {
						$(this).removeClass('focus');
	        		}
	        		setTimeout(function(){
	        			$(".people-result").hide().html("");
	        		},200)
	        		
	        	}
		});

		$(".js-search").on("click",function(){
			var keyword =$.trim($(".keyword").val());
			if(!keyword) return
			$(".course-sidebar-result").hide().html("");

			currIndex=-1;
		})

		$(document).on('click','.cancel',function  (e) {
			e.preventDefault();
			var  id =$(this).data('id');
			var $wrapper = $(this).closest('li');
			var d = dialog({
							skin:'select-dialog',
							title:'提示',
							content:'确定将此人移除黑名单吗',
							zIndex: 870000,
							ok: function () {
						       $.getJSON('test',{id:id}).done(function  () {
						       	$wrapper.remove();
						       })
						    },
						    okValue:'确定',
						    cancel:function  () {},
						    cancelValue:'取消'
						});
						d.showModal();
		})

})
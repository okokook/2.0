define(function(require, exports, module){
	var imgupload = require('imgupload');
	var template = require('template');
	var dialog = require('dialog');
	require('autosize');
	$('#content-input').autosize();

	//图片上传
	var uploadObj ={
		url:'test'
	}

	imgupload.imgupload(uploadObj);
	function quickDialog (con) {
		var  d = dialog({content:con});
		d.show();
		setTimeout(function  () {
			d.close().remove();
		},1000)
	}

	$('.btn-submit').click(function(e) {
		e.preventDefault();
		if ($(this).data('repeat') == true) {
			return;
		}
		var postCon = $('.editor-post_con .con-wrapper').val().trim();


		if (!postCon) {
			$('.editor-post_con .con-wrapper').focus();
			quickDialog('请填写后再发布');
			return;
		}

		$(this).data('repeat', true);
		$.getJSON('test3', {
			postCon: postCon,
			imgList: imgupload.imgList

		}).always(function(data) {

			resetShareBox(data);

		})
	})

	$(document)
			.on('click', '.upload-img', function() { //上传图片
				$('.img-upload_box').css({
					'height': "auto",
					'border-top': "1px dotted #bbb",
					'padding-top': 20
				});

				$('input[type="file"]').click();
			})
			.on('click', '.pic-add-btn', function(e) {
				$('input[type="file"]').click();
			})
			.on('click','.addFriendBtn',function (e){
				e.preventDefault();
				var $ele = $(this);
				var uid = $ele.data('id');

				$.getJSON('test3',{id:uid}).done(function (){
					$ele.text('已关注');
				})
			})

	//帖子添加到首页
	function addPost(data){
		var htmltem = template('doc-template',data);
		$('.my-post .post-bd ul').prepend(htmltem);
	}

	//图片重置
	function resetimg(){
		imgupload.reset();
		$('.editor-post_footer .upload-img').show();
		$('.img-upload_box').css({
			'height':0,
			'overflow':'hidden',
			'border':'none',
			'padding-top':0
		});
		$('.file-item').remove();
	}

	//发布框重置
	function resetShareBox(data){
		 var html = addPost(data);
		$('.btn-submit').data('repeat', false);
		if ($('.queueList li').length) {
			resetimg();
		}
	}

	//查看表格

	$('.evaluate-record').click(function  (e) {
		e.preventDefault();
		var $ele = $(this);
		var id = $ele.data('id');
		$.getJSON('url',{id:id}).done(function (data){
			var html = template('record-template',data);
			selectDialog(html);
		})
	})
	
	//  动画函数
	var fx = function( fn , begin , end ){
	    //  渐出特效
	    fx.easeOut = function(t,b,c,d){
	            return -c *(t /= d)*(t-2) + b;
	    }
	    var options = arguments[3] || {};
	    var duration = options.duration || 500;
	    var ease = options.ease || fx.easeOut;
	    startTime = new Date().getTime();
	    (function(){
	        setTimeout(function(){
	            timestamp = new Date().getTime() - startTime;
	            fn( ease( timestamp,begin, ( end - begin),duration) , 'step' );

	            if(duration <= timestamp){
	                fn( end , 'end' );
	            }else{
	                setTimeout(arguments.callee,25);
	            }
	        },25)
	    })();
	}
	    var getBodyW = function(){ return document.body.offsetWidth; };
	    var getBodyH = function(){ return document.body.offsetHeight; };
	    var getElTop = function(el){ return el.offsetTop+170; };

	        //  动画卷动
	        var  scrollTopTo = function( to ){
	            var start =  document.body.scrollTop;
	            to-=50;
	            fx( function( now , type ){  window.scroll(0,now); },start ,to );
	        }

	        //  展开时序
	        var expandScrubber = function( year,ele ){

	            var $years  = $('.s_year');
	            var $months = $('.s_month');
	            var $year_months = $('#scrubber').find('.'+year+'_month');

	            $years.removeClass('cur');
	            $months.hide().removeClass('cur');
	            $year_months.css('display','block');
	            ele.addClass('cur');
	        }

	        //  高亮月份
	        function highlightMonth (year,ele){
	            var $months = $('.'+year+'_month');
	            $months.removeClass('cur');
	           ele.addClass('cur');
	        }

	        //  年份点击处理
	        $('.s_year').click(function  (e) {
	            e.preventDefault();
	            var $ele = $(this),
	                year = $(this).data('year'),
	                top = $('#content_year_'+year).offset().top-30;

	             expandScrubber(year ,$ele);
	             scrollTopTo( top );

	        })

	        //  月份点击处理
	        $('.s_month').click(function  (e) {
	            e.preventDefault();
	            var $ele = $(this),
	                year = $(this).data('year'),
	                month = $(this).data('month'),
	                top = $('#poster_'+year+'_'+month).offset().top-30;
	            highlightMonth(year,$ele);
	            scrollTopTo( top );

	        })

	        //  根据窗口滚动条更新时序年份状态
	        var updateScrubberOnTop = function( top ){

	            var $years  = $('#content .c_year');
	            var tops = [];

	            $years.each(function  () {
	                var top = $(this).offset().top-300;
	                tops.push(top);
	            })
	            for(var i = 1; i <tops.length ; i++){
	                if( top > tops[i-1] && top < tops[i] ){

	                    var year = $years.eq(i-1).text();
	                    expandScrubber(year,$('#scrubber_year_'+year));
	                    return ;
	                }
	            }

	        }

	        //  根据窗口滚动条更新时序月份状态
	        var updateMonthOnTop = function( top ){

	            var $months  = $('#content .c_month');
	            var tops = [];

	             $months.each(function  () {
	                var top = $(this).offset().top-300;
	                tops.push(top);
	            })
	             console.log(tops);

	            for(var i = 1; i <tops.length ; i++){
	                if( top > tops[i-1] && top < tops[i]){
	                    var info  = $months[i-1].id.split('_');
	                    console.log(info);
	                    var year  = info[1];
	                    var month = info[2];
	                    highlightMonth( year, $('#scrubber_month_'+year+'_'+month) );
	                    return ;
	                }
	            }
	        }


	        //  窗口改变事件处理; 保持时序列表的位置
	        $(window).resize = function(){
	           $(window).scroll();
	        }

	        //  滚动条事件处理; 定位时间
	        $(window).scroll(function  () {
	            var top = document.body.scrollTop ;
	          if( top > 400){
	                $('.scrubber').css({
	                    'position':'fixed',
	                    'top':'260px',
	                    'left':'221px'
	                })
	            }else{
	                $('.scrubber').css({
	                    'position':'absolute',
	                    'top':'29px',
	                    'left':'0'
	                })
	            }
	             //更新时序状态
	            updateScrubberOnTop( top );
	            updateMonthOnTop( top );
	        })

})
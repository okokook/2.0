/*TMODJS:{"version":2,"md5":"b6a7e0c71d326a5cae0ee72ebb928ab3"}*/
template('pro-ans-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$each(list,function(value,i){
$out+=' <li data-id="';
$out+=$string(value.postId);
$out+='" class="post-item"> <div class="post-item_photo"><a href="';
$out+=$string(value.authorLink);
$out+='" class="cardInfo" data-id="';
$out+=$string(value.authorId);
$out+='"><img src="';
$out+=$string(value.authorPicLink);
$out+='" alt="';
$out+=$string(value.authorName);
$out+='"></a></div> <div class="post-item_con post-repost_wrapper"> <a class="post-item_author cardInfo" href="';
$out+=$string(value.authorLink);
$out+='" data-id="';
$out+=$string(value.authorId);
$out+='">';
$out+=$string(value.authorName);
$out+='</a> <div class="post-text">';
$out+=$string(value.postCon);
$out+='</div> <div class="retweet-post"> <a class="post-item_author cardInfo" href="';
$out+=$string(value.reauthorLink);
$out+='" data-id="';
$out+=$string(value.reauthorId);
$out+='">';
$out+=$string(value.reauthorName);
$out+='</a> ';
if(value.rehasExpand){
$out+=' <div class="post-item_pro"> ';
$out+=$string(value.repostCon_a);
$out+=' <a href="javascript:;" class="post-expand"><i></i>展开</a> </div> <div class="post-item_pro see-all"> ';
$out+=$string(value.repostCon_b);
$out+=' <a href="javascript:;" class="post-packUp"><i></i>收起</a> </div> ';
}else{
$out+=' <div class="post-item_pro"> ';
$out+=$string(value.repostCon_a);
$out+=' </div> ';
}
$out+=' <div class="original-post-info"> <span class="time">';
$out+=$string(value.oritime);
$out+='</span> <a href="';
$out+=$string(value.postTitleLink);
$out+='">相关讨论(';
$out+=$string(value.oricomment);
$out+=')</a> </div> </div> <div class="post-item_info"> <div class="info-group">';
$out+=$string(value.postTime);
$out+=' <span class="post-from">来自<a href="';
$out+=$string(value.postGroLink);
$out+='">';
$out+=$string(value.postGroName);
$out+='</a></span> <a href="" class="reportPost">举报</a> </div> <div class="info-ops"> ';
if((value.hashuged)){
$out+=' <a class="huged" href="javascript:;" title="喜欢" data-repeat=true>已喜欢(<span class="num">';
$out+=$string(value.hugNum);
$out+='</span>)</a> ';
}else{
$out+=' <a class="hug" href="javascript:;" title="喜欢"><span class="tit">喜欢</span>(<span class="num">';
$out+=$string(value.hugNum);
$out+='</span>)</a> ';
}
$out+=' ';
if((value.hasCollected)){
$out+=' <a class="collect collected" href="javascript:;" title="觉得有用，收藏下吧">收藏</a> <a class="un-collect collected" href="javascript:;">取消收藏</a> ';
}else{
$out+=' <a class="collect" href="javascript:;" title="觉得有用，收藏下吧">收藏</a> <a class="un-collect" href="javascript:;">取消收藏</a> ';
}
$out+=' <a href="javascript:;" class="repost" >转发(<span class="num">';
$out+=$string(value.repostNum);
$out+='</span>)</a> <a class="post-comment last" href="javascript:;" title="我要评论" data-comment="';
$out+=$string(value.hasComment);
$out+='">评论(<span class="num">';
$out+=$string(value.CommentNum);
$out+='</span>)</a> <a href="javascript:;" class="post-comment_up last">收起评论</a> </div> </div> </div> </li> ';
});
return new String($out);
});
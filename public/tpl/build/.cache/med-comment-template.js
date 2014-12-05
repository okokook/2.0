/*TMODJS:{"version":4,"md5":"69a044f08c2a2edff53d21a8f11ebb70"}*/
template('med-comment-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$each(list,function(value,i){
$out+=' <li class="post-item" data-id="';
$out+=$string(value.postId);
$out+='"> <div class="pic"><a href="';
$out+=$string(value.authorLink);
$out+='" class="cardInfo" data-id="';
$out+=$string(value.authorId);
$out+='"> <img src="';
$out+=$string(value.authorPicLink);
$out+='"> </a> </div> <div class="detail"> <div class="name"><a href="';
$out+=$string(value.authorLink);
$out+='" class="cardInfo" data-id="';
$out+=$string(value.authorId);
$out+='">';
$out+=$string(value.authorName);
$out+='</a></div> <div class="score">疗效:<span class="number">';
$out+=$string(value.effectNum);
$out+='</span>安全度:<span class="number">';
$out+=$string(value.safetyNum);
$out+='</span>性价比:<span class="number">';
$out+=$string(value.priceNum);
$out+='</span></div> <div class="con">';
$out+=$string(value.postCon);
$out+='</div> <div class="post-item_info"> <div class="info-group">';
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
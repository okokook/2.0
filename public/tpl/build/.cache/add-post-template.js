/*TMODJS:{"version":1,"md5":"d366e7e6fe10fdff0776870662148271"}*/
template('add-post-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,value=$data.value,postTitle=$data.postTitle,$out='';$out+='<li data-id="';
$out+=$string(value.postId);
$out+='" class="post-item"> <div class="post-item_photo"><a href="';
$out+=$string(value.authorLink);
$out+='" class="cardInfo" data-id="';
$out+=$string(value.authorId);
$out+='"><img src="';
$out+=$string(value.authorPicLink);
$out+='" alt="';
$out+=$string(value.authorName);
$out+='"></a></div> <div class="post-item_con"> <a class="post-item_author cardInfo" href="';
$out+=$string(value.authorLink);
$out+='" data-id="';
$out+=$string(value.authorId);
$out+='">';
$out+=$string(value.authorName);
$out+='</a> <div class="my-post-quickops"> <i class="tra"></i> <ul> <li><a href="" class="edit">修改</a></li> <li><a href="" class="remove">删除</a></li> </ul> </div> <h2><a href="';
$out+=$string(value.postLink);
$out+='" class="post-title-text">';
$out+=$string(postTitle);
$out+='</a></h2> ';
if(value.hasExpand){
$out+=' <div class="post-item_pro"> ';
$out+=$string(value.postCon_a);
$out+=' <a href="javascript:;" class="post-expand"><i></i>展开</a> </div> <div class="post-item_pro see-all"> ';
$out+=$string(value.postCon_b);
$out+=' <a href="javascript:;" class="post-packUp"><i></i>收起</a> </div> ';
}else{
$out+=' <div class="post-item_pro"> ';
$out+=$string(value.postCon_a);
$out+=' </div> ';
}
$out+=' <div class="post-item_info"> <div class="info-group">';
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
$out+='</span>)</a> <a href="javascript:;" class="post-comment_up last">收起评论</a> </div> </div> </div> </li>';
return new String($out);
});
/*TMODJS:{"version":7,"md5":"2d59c73d8e0f846cacef906a795a039b"}*/
template('my-topic-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,postTitle=$data.postTitle,$out='';$each(list,function(value,i){
$out+=' <li data-id="';
$out+=$string(value.postId);
$out+='" class="post-item"> ';
if(value.isRepost){
$out+=' <div class="post-item_con post-repost_wrapper"> ';
}else{
$out+=' <div class="post-item_con"> ';
}
$out+=' <div class="post-ops"> <i class="icon"></i> <ul class="ops-menu"> <li><a href="javascript:;" class="removePost">删除</a></li> </ul> </div> ';
if(value.isRepost){
$out+=' <div class="post-text">';
$out+=$string(value.postCon);
$out+='</div> <div class="retweet-post"> <a class="post-item_author cardInfo" href="';
$out+=$string(value.reauthorLink);
$out+='" data-id="';
$out+=$string(value.reauthorId);
$out+='">';
$out+=$string(value.reauthorName);
$out+='</a> <h2><a href="';
$out+=$string(value.repostLink);
$out+='" class="post-title-text">';
$out+=$string(value.repostTitle);
$out+='</a></h2> ';
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
$out+=')</a> </div> </div> ';
}else{
$out+=' <h2><a href="';
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
$out+=' ';
}
$out+=' <div class="post-item_info"> <div class="info-group">';
$out+=$string(value.postTime);
$out+=' <span class="post-from">来自<a href="';
$out+=$string(value.postGroLink);
$out+='">';
$out+=$string(value.postGroName);
$out+='</a></span> <a href="" class="reportPost">举报</a> </div> <div class="info-ops"> ';
if((value.hashuged)){
$out+=' <a class="huged" href="javascript:;" data-repeat = true>取消赞(<span class="num">';
$out+=$string(value.hugNum);
$out+='</span>)</a> ';
}else{
$out+=' <a class="hug" href="javascript:;"><span class="tit">赞</span>(<span class="num">';
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
$out+=' ';
return new String($out);
});
/*TMODJS:{"version":3,"md5":"1ddc1e0b5995ba47a2001293b7a4ea71"}*/
template('post-ops-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,value=$data.value,$out='';$out+='<div class="post-item_info"> <div class="info-group">';
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
$out+='</span>)</a> <a href="javascript:;" class="post-comment_up last">收起评论</a> </div> </div>';
return new String($out);
});
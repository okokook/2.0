/*TMODJS:{"version":2,"md5":"db0b36d84b063ac96b95516083f1632a"}*/
template('my-comment-template',function($data,$filename) {
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
$out+='</a> <h2><a href="';
$out+=$string(value.repostLink);
$out+='" class="post-title-text">';
$out+=$string(value.repostTitle);
$out+='</a></h2> <div class="post-item_pro"> ';
$out+=$string(value.repostCon_a);
$out+=' </div> <div class="post-item_pro see-all"> ';
$out+=$string(value.repostCon_b);
$out+=' <a href="javascript:;" class="post-packUp"><i></i>收起</a> </div> <div class="original-post-info"> <span class="time">';
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
$out+=' <a class="huged" href="javascript:;" data-repeat = true>取消赞(<span class="num">';
$out+=$string(value.hugNum);
$out+='</span>)</a> ';
}else{
$out+=' <a class="hug" href="javascript:;"><span class="tit">赞</span>(<span class="num">';
$out+=$string(value.hugNum);
$out+='</span>)</a> ';
}
$out+=' <a class="post-comment last" href="javascript:;">回复(<span class="num">';
$out+=$string(value.CommentNum);
$out+='</span>)</a> <a href="javascript:;" class="post-comment_up last">收起回复</a> </div> </div> </div> </li> ';
});
return new String($out);
});
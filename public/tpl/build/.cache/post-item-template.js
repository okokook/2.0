/*TMODJS:{"version":2,"md5":"364209f5dcc0d63a82d3e42d28b9c4bd"}*/
template('post-item-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,value=$data.value,$string=$utils.$string,postTitle=$data.postTitle,$out='';if(value.isRepost){
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
return new String($out);
});
/*TMODJS:{"version":3,"md5":"d33732cf1146e06561979e9ba09ec824"}*/
template('comment-list',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,hasNextpage=$data.hasNextpage,nextPage=$data.nextPage,$out='';$out+=' ';
$each(list,function(value,i){
$out+=' <li class="quick-comment_wrapper" data-id="';
$out+=$string(value.quick_cId);
$out+='"> <div class="quick-comment_author"> <a href="';
$out+=$string(value.quick_link);
$out+='"> <img src="';
$out+=$string(value.quick_Piclink);
$out+='" title="';
$out+=$string(value.quick_author);
$out+='"> </a> </div> <div class="quick-comment_conWrapper"> ';
if((value.isConversation)){
$out+=' <p> <a href="';
$out+=$string(value.quick_link);
$out+='" class="quick-comment_nick">';
$out+=$string(value.quick_author);
$out+='</a>回复<a href="';
$out+=$string(value.quickTo_link);
$out+='" class="quick-comment_to">';
$out+=$string(value.quickTo_author);
$out+='</a>: </p> ';
}else{
$out+=' <p> <a href="';
$out+=$string(value.quick_link);
$out+='" class="quick-comment_nick">';
$out+=$string(value.quick_author);
$out+='</a>: </p> ';
}
$out+=' <p class="quick-comment-con"> ';
$out+=$string(value.quick_con);
$out+=' </p> </div> <div class="quick-comment_opsWrapper"> <div class="published-time">';
$out+=$string(value.quick_time);
$out+='<a href="" class="reportComment">举报</a></div> <div class="quick-comment_ops"> <a href="javascript:;" class="hug">喜欢</a> ';
if((value.isConversation)){
$out+=' <a href="" class="see-all_dialog" data-diaid="';
$out+=$string(value.quick_diaId);
$out+='">查看所有对话</a> ';
}
$out+=' <a href="" class="quick-replay_btn last">回复</a> </div> </div> </li> ';
});
$out+=' ';
if(hasNextpage){
$out+=' <li class="nextPage-comment_btn" data-next= "';
$out+=$string(nextPage);
$out+='"> 查看全部 </li> ';
}
return new String($out);
});
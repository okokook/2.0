/*TMODJS:{"version":2,"md5":"82a5d4a0272370c81b4f19066c0951d0"}*/
template('single-comment',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,quick_cId=$data.quick_cId,quick_link=$data.quick_link,quick_Piclink=$data.quick_Piclink,quick_author=$data.quick_author,isConversation=$data.isConversation,quickTo_link=$data.quickTo_link,quickTo_author=$data.quickTo_author,quick_con=$data.quick_con,quick_time=$data.quick_time,quick_diaId=$data.quick_diaId,$out='';$out+='<li class="quick-comment_wrapper" data-id="';
$out+=$string(quick_cId);
$out+='"> <div class="quick-comment_author"> <a href="';
$out+=$string(quick_link);
$out+='"> <img src="';
$out+=$string(quick_Piclink);
$out+='" title="';
$out+=$string(quick_author);
$out+='"> </a> </div> <div class="quick-comment_conWrapper"> ';
if((isConversation)){
$out+=' <p> <a href="';
$out+=$string(quick_link);
$out+='" class="quick-comment_nick">';
$out+=$string(quick_author);
$out+='</a>回复<a href="';
$out+=$string(quickTo_link);
$out+='" class="quick-comment_to">';
$out+=$string(quickTo_author);
$out+='</a>: </p> ';
}else{
$out+=' <p> <a href="';
$out+=$string(quick_link);
$out+='" class="quick-comment_nick">';
$out+=$string(quick_author);
$out+='</a>: </p> ';
}
$out+=' <p class="quick-comment-con"> ';
$out+=$string(quick_con);
$out+=' </p> </div> <div class="quick-comment_opsWrapper"> <div class="published-time">';
$out+=$string(quick_time);
$out+='</div> <div class="quick-comment_ops"> ';
if((isConversation)){
$out+=' <a href="" class="see-all_dialog" data-diaid="';
$out+=$string(quick_diaId);
$out+='">查看所有对话</a> ';
}
$out+=' <a href="" class="delete-comment last">删除</a> </div> </div> </li>';
return new String($out);
});
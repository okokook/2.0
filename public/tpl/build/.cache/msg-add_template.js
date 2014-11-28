/*TMODJS:{"version":1,"md5":"ea148b308d5b49554b5821d1a78dbfed"}*/
template('msg-add_template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,link=$data.link,facelink=$data.facelink,name=$data.name,con=$data.con,$out='';$out+='<div class="msg_dialogue_list msg_dialist_l"> <div class="msg_dialist_box"> <div class="msg_dialist_pic"><a href="';
$out+=$string(link);
$out+='"><img src="';
$out+=$string(facelink);
$out+='" alt="';
$out+=$string(name);
$out+='"></a></div> <div class="msg_dialist_content"> <div class="msg_arrow"><em>◆</em><span>◆</span></div> <div class="msg_dialist_main"> <div class="msg_diamain_box"> <div class="msg_diamain_con"> <p class="msg_dia_txt">';
$out+=$string(con);
$out+='</p> <div class="msg_ctrl"></div> </div> </div> </div> </div> </div> </div>';
return new String($out);
});
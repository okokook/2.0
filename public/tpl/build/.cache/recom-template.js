/*TMODJS:{"version":1,"md5":"7b077426fc25df64b45ac103a6c5abec"}*/
template('recom-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$each(list,function(value,i){
$out+=' <div class="user-item"> <div class="avator"><a href="';
$out+=$string(value.recomLink);
$out+='"><img src="';
$out+=$string(value.recomPicLink);
$out+='"></a></div> <div class="info-wrapper"> <div class="name">';
$out+=$string(value.recomName);
$out+='</div> <div class="follow-btn" data-id = "';
$out+=$string(value.recomId);
$out+='"> +加关注 </div> </div> </div> ';
});
return new String($out);
});
/*TMODJS:{"version":1,"md5":"ce0e207db5e69577c479ed7f89e17093"}*/
template('suggest-people-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,f=$data.f,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$each(f,function(value,i){
$out+=' <div class="user-item"> <div class="avator"><a href="';
$out+=$string(value.path);
$out+='"><img src="';
$out+=$string(value.face);
$out+='" alt="';
$out+=$string(value.username);
$out+='"></a></div> <div class="info-wrapper"> <div class="name">';
$out+=$string(value.username);
$out+='</div> <div class="follow-btn" data-id="';
$out+=$string(value.userid);
$out+='"> +加关注 </div> </div> </div> ';
});
return new String($out);
});
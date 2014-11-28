/*TMODJS:{"version":2,"md5":"ee12b20565e7d82c6b1460c5ae6e9d42"}*/
template('tag-edit-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$out+='<li> ';
$each(list,function(value,i){
$out+=' <div class="tagItem"> <div class="tagItem-hd">';
$out+=$string(value.tagCat);
$out+='</div> <div class="tagItem-bd"> ';
$each(value.tagList,function(value,i){
$out+=' ';
if(value.isSelected){
$out+=' <a href="javascript:;" data-cat="';
$out+=$string(value.cat);
$out+='" data-id="';
$out+=$string(value.tagId);
$out+='" class="selected">';
$out+=$string(value.tagName);
$out+='</a> ';
}else{
$out+=' <a href="javascript:;" data-cat="';
$out+=$string(value.cat);
$out+='" data-id="';
$out+=$string(value.tagId);
$out+='">';
$out+=$string(value.tagName);
$out+='</a> ';
}
$out+=' ';
});
$out+=' </div> </div> ';
});
$out+=' </li>';
return new String($out);
});
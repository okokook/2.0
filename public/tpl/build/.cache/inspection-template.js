/*TMODJS:{"version":5,"md5":"71555f0a4a71825204305d29fd55578b"}*/
template('inspection-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$out+='<div class="inspection-hd"> ';
$each(list,function(value,i){
$out+=' ';
if(i == 0){
$out+=' <a href="javascript:;" class="selected">';
$out+=$string(value.cat);
$out+='</a> ';
}else{
$out+=' ';
$out+='<a href="javascript:;">';
$out+=$string(value.cat);
$out+='</a>';
}
$out+=' ';
});
$out+=' </div> <div class="inspection-bd"> ';
$each(list,function(value,i){
$out+=' ';
if(i == 0){
$out+=' <div class="inspection-item selected"> ';
}else{
$out+=' <div class="inspection-item"> ';
}
$out+=' <table> <tr> <td>项目名称</td> <td>结果</td> <td>参考值</td> </tr> ';
$each(value.datas,function(value,i){
$out+=' <tr> <td>';
$out+=$string(value.name);
$out+='</td> <td> ';
$out+=$string(value.realVal);
$out+=' ';
if(value.state == 'up'){
$out+=' <i class="up"></i> ';
}else if(value.state == 'normal'){
$out+=' <i class="normal"></i> ';
}else{
$out+=' <i class="down"></i> ';
}
$out+=' </td> <td>';
$out+=$string(value.referVal);
$out+='</td> </tr> ';
});
$out+=' </table> </div> ';
});
$out+=' </div> ';
return new String($out);
});
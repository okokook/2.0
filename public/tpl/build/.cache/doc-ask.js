/*TMODJS:{"version":2,"md5":"23e3cdff853b45a463296fa5cdf6fea9"}*/
template('doc-ask',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,value=$data.value,i=$data.i,$string=$utils.$string,$out='';$out+='<ul> ';
$each(list,function(value,i){
$out+=' <li> <div class="doc-pic"> <a href=""><img src="';
$out+=$string(value.img_link);
$out+='" alt=""></a> </div> <div class="doc-con authentic"> <div class="doc_name">';
$out+=$string(value.doc_name);
$out+='<i></i></div> <div class="doc-ask_box"><a href="" class="doc-follow">关注</a></div> <div class="doc-ins">';
$out+=$string(value.doc_ins);
$out+='</div> </div> </li> ';
});
$out+=' </ul>';
return new String($out);
});
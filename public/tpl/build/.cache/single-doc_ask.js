/*TMODJS:{"version":2,"md5":"791e5437d1dda6393f7ee8bf834b95dc"}*/
template('single-doc_ask',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,img_link=$data.img_link,doc_name=$data.doc_name,doc_ins=$data.doc_ins,$out='';$out+='<li> <div class="doc-pic"> <a href=""><img src="';
$out+=$string(img_link);
$out+='" alt=""></a> </div> <div class="doc-con authentic"> <div class="doc_name">';
$out+=$string(doc_name);
$out+='<i></i></div> <div class="doc-ask_box"><a href="" class="doc-follow">关注</a></div> <div class="doc-ins">';
$out+=$string(doc_ins);
$out+='</div> </div> </li>';
return new String($out);
});
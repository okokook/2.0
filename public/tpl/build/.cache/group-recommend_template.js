/*TMODJS:{"version":1,"md5":"5293b3aec30556d094bd3f5aa55d3833"}*/
template('group-recommend_template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,cat=$data.cat,hasDoc=$data.hasDoc,group=$data.group,doc=$data.doc,$each=$utils.$each,value=$data.value,$index=$data.$index,hasMore=$data.hasMore,type=$data.type,hasPatient=$data.hasPatient,patient=$data.patient,$out='';$out+='<li class="item"> <div class="list-item" data-id="';
$out+=$string(cat);
$out+='"> <div class="bd"> ';
if(hasDoc){
$out+=' <dl> <dt>活跃';
$out+=$string(group);
$out+='医生(';
$out+=$string(doc.number);
$out+=')</dt> <dd> <ul> ';
$each(doc.list,function(value,$index){
$out+=' <li> <div class="face"><a href="';
$out+=$string(value.face);
$out+='"><img src="';
$out+=$string(value.img_link);
$out+='" alt="';
$out+=$string(value.name);
$out+='"></a></div> <div class="info"> <div class="name">';
$out+=$string(value.name);
$out+='</div> ';
if(value.followed){
$out+=' <div class="followed" data-id="';
$out+=$string(value.cid);
$out+='">已关注</div> ';
}else{
$out+=' <div class="follow" data-id="';
$out+=$string(value.cid);
$out+='">关注</div> ';
}
$out+=' </div> </li> ';
});
$out+=' </ul> ';
if(hasMore){
$out+=' <a href="';
$out+=$string(doc.more);
$out+='" class="more" data-type="';
$out+=$string(type);
$out+='">更多...</a> ';
}
$out+=' </dd> </dl> ';
}
$out+=' ';
if(hasPatient){
$out+=' <dl> <dt>活跃';
$out+=$string(group);
$out+='病友(';
$out+=$string(patient.number);
$out+=')</dt> <dd> <ul> ';
$each(patient.list,function(value,$index){
$out+=' <li> <div class="face"><a href="';
$out+=$string(value.face);
$out+='"><img src="';
$out+=$string(value.img_link);
$out+='" alt="';
$out+=$string(value.name);
$out+='"></a></div> <div class="info"> <div class="name">';
$out+=$string(value.name);
$out+='</div> ';
if(value.followed){
$out+=' <div class="followed" data-id="';
$out+=$string(value.cid);
$out+='">已关注</div> ';
}else{
$out+=' <div class="follow" data-id="';
$out+=$string(value.cid);
$out+='">关注</div> ';
}
$out+=' </div> </li> ';
});
$out+=' </ul> ';
if(hasMore){
$out+=' <a href="';
$out+=$string(patient.more);
$out+='" class="more" data-type="';
$out+=$string(type);
$out+='">更多...</a> ';
}
$out+=' </dd> </dl> ';
}
$out+=' </div> </div> </li>';
return new String($out);
});
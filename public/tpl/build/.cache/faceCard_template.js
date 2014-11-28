/*TMODJS:{"version":5,"md5":"ca82f7a94b87934e1224c66f9fae53d9"}*/
template('faceCard_template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,spaceLink=$data.spaceLink,picLink=$data.picLink,personName=$data.personName,spacLink=$data.spacLink,sex=$data.sex,loc=$data.loc,groupLink=$data.groupLink,groupNum=$data.groupNum,followLink=$data.followLink,followNum=$data.followNum,fansLink=$data.fansLink,fansNum=$data.fansNum,profile=$data.profile,isFollowed=$data.isFollowed,uid=$data.uid,$out='';$out+='<div class="tooltip-inner"> <div class="info"> <div class="card"> <div class="headpic"> <a href="';
$out+=$string(spaceLink);
$out+='" target="_blank"> <img src="';
$out+=$string(picLink);
$out+='" alt="';
$out+=$string(personName);
$out+='" width="50px" height="50px"> </a> </div> <div class="content"> <div class="item"> <a href="';
$out+=$string(spacLink);
$out+='" target="_blank" class="name">';
$out+=$string(personName);
$out+='</a> </div> <div class="item"> <span class="m head">';
$out+=$string(sex);
$out+='</span>&nbsp;&nbsp;';
$out+=$string(loc);
$out+=' </div> <div class="item"> <span>小组&nbsp;<a href="';
$out+=$string(groupLink);
$out+='" target="_blank">';
$out+=$string(groupNum);
$out+='</a></span>&nbsp;&nbsp;&nbsp; <span>关注&nbsp;<a href="';
$out+=$string(followLink);
$out+='" target="_blank">';
$out+=$string(followNum);
$out+='</a></span>&nbsp;&nbsp;&nbsp; <span>粉丝&nbsp;<a href="';
$out+=$string(fansLink);
$out+='" target="_blank">';
$out+=$string(fansNum);
$out+='</a></span> </div> </div> </div> <div class="desc"><label>个人简介：</label><span>';
$out+=$string(profile);
$out+='</span> </div> </div> <div class="operations"> <div class="relations"> ';
if(isFollowed){
$out+=' <div class="followed"> <span class="onefollow">已关注&nbsp;|&nbsp;</span><a data-uid="';
$out+=$string(uid);
$out+='" class="removeFriend" href="javascript:;">取消</a> <a href="javascript:;" class="addFriend" data-uid="';
$out+=$string(uid);
$out+='">加关注</a> </div> ';
}else{
$out+=' <div class="follow"> <span class="onefollow">已关注&nbsp;|&nbsp;</span><a data-uid="';
$out+=$string(uid);
$out+='" class="removeFriend">取消</a> <a href="javascript:;" class="addFriend" data-uid="';
$out+=$string(uid);
$out+='">加关注</a> </div> ';
}
$out+=' </div> <div class="send-msg-wrapper"><a href="javascript:;" data-uid="';
$out+=$string(uid);
$out+='" data-user="';
$out+=$string(personName);
$out+='" class="send-msg">私信</a></div> </div> </div>';
return new String($out);
});
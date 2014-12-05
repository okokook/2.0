/*TMODJS:{"version":"1.0.0"}*/
!function(){function a(a,b){return(/string|function/.test(typeof b)?h:g)(a,b)}function b(a,c){return"string"!=typeof a&&(c=typeof a,"number"===c?a+="":a="function"===c?b(a.call(a)):""),a}function c(a){return l[a]}function d(a){return b(a).replace(/&(?![\w#]+;)|[<>"']/g,c)}function e(a,b){if(m(a))for(var c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)}function f(a,b){var c=/(\/)[^/]+\1\.\.\1/,d=("./"+a).replace(/[^/]+$/,""),e=d+b;for(e=e.replace(/\/\.\//g,"/");e.match(c);)e=e.replace(c,"/");return e}function g(b,c){var d=a.get(b)||i({filename:b,name:"Render Error",message:"Template not found"});return c?d(c):d}function h(a,b){if("string"==typeof b){var c=b;b=function(){return new k(c)}}var d=j[a]=function(c){try{return new b(c,a)+""}catch(d){return i(d)()}};return d.prototype=b.prototype=n,d.toString=function(){return b+""},d}function i(a){var b="{Template Error}",c=a.stack||"";if(c)c=c.split("\n").slice(0,2).join("\n");else for(var d in a)c+="<"+d+">\n"+a[d]+"\n\n";return function(){return"object"==typeof console&&console.error(b+"\n\n"+c),b}}var j=a.cache={},k=this.String,l={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},n=a.utils={$helpers:{},$include:function(a,b,c){return a=f(c,a),g(a,b)},$string:b,$escape:d,$each:e},o=a.helpers=n.$helpers;a.get=function(a){return j[a.replace(/^\.\//,"")]},a.helper=function(a,b){o[a]=b},"function"==typeof define?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:this.template=a,/*v:1*/
a("add-post-template",function(a){"use strict";var b=this,c=(b.$helpers,b.$string),d=a.value,e=a.postTitle,f="";return f+='<li data-id="',f+=c(d.postId),f+='" class="post-item"> <div class="post-item_photo"><a href="',f+=c(d.authorLink),f+='" class="cardInfo" data-id="',f+=c(d.authorId),f+='"><img src="',f+=c(d.authorPicLink),f+='" alt="',f+=c(d.authorName),f+='"></a></div> <div class="post-item_con"> <a class="post-item_author cardInfo" href="',f+=c(d.authorLink),f+='" data-id="',f+=c(d.authorId),f+='">',f+=c(d.authorName),f+='</a> <div class="my-post-quickops"> <i class="tra"></i> <ul> <li><a href="" class="edit">\u4fee\u6539</a></li> <li><a href="" class="remove">\u5220\u9664</a></li> </ul> </div> <h2><a href="',f+=c(d.postLink),f+='" class="post-title-text">',f+=c(e),f+="</a></h2> ",d.hasExpand?(f+=' <div class="post-item_pro"> ',f+=c(d.postCon_a),f+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',f+=c(d.postCon_b),f+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(f+=' <div class="post-item_pro"> ',f+=c(d.postCon_a),f+=" </div> "),f+=' <div class="post-item_info"> <div class="info-group">',f+=c(d.postTime),f+=' <span class="post-from">\u6765\u81ea<a href="',f+=c(d.postGroLink),f+='">',f+=c(d.postGroName),f+='</a></span> <a href="" class="reportPost">\u4e3e\u62a5</a> </div> <div class="info-ops"> ',d.hashuged?(f+=' <a class="huged" href="javascript:;" title="\u559c\u6b22" data-repeat=true>\u5df2\u559c\u6b22(<span class="num">',f+=c(d.hugNum),f+="</span>)</a> "):(f+=' <a class="hug" href="javascript:;" title="\u559c\u6b22"><span class="tit">\u559c\u6b22</span>(<span class="num">',f+=c(d.hugNum),f+="</span>)</a> "),f+=" ",f+=d.hasCollected?' <a class="collect collected" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect collected" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ':' <a class="collect" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ',f+=' <a href="javascript:;" class="repost" >\u8f6c\u53d1(<span class="num">',f+=c(d.repostNum),f+='</span>)</a> <a class="post-comment last" href="javascript:;" title="\u6211\u8981\u8bc4\u8bba" data-comment="',f+=c(d.hasComment),f+='">\u8bc4\u8bba(<span class="num">',f+=c(d.CommentNum),f+='</span>)</a> <a href="javascript:;" class="post-comment_up last">\u6536\u8d77\u8bc4\u8bba</a> </div> </div> </div> </li>',new k(f)}),/*v:3*/
a("comment-list",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f=a.hasNextpage,g=a.nextPage,h="";return h+=" ",c(d,function(a){h+=' <li class="quick-comment_wrapper" data-id="',h+=e(a.quick_cId),h+='"> <div class="quick-comment_author"> <a href="',h+=e(a.quick_link),h+='"> <img src="',h+=e(a.quick_Piclink),h+='" title="',h+=e(a.quick_author),h+='"> </a> </div> <div class="quick-comment_conWrapper"> ',a.isConversation?(h+=' <p> <a href="',h+=e(a.quick_link),h+='" class="quick-comment_nick">',h+=e(a.quick_author),h+='</a>\u56de\u590d<a href="',h+=e(a.quickTo_link),h+='" class="quick-comment_to">',h+=e(a.quickTo_author),h+="</a>: </p> "):(h+=' <p> <a href="',h+=e(a.quick_link),h+='" class="quick-comment_nick">',h+=e(a.quick_author),h+="</a>: </p> "),h+=' <p class="quick-comment-con"> ',h+=e(a.quick_con),h+=' </p> </div> <div class="quick-comment_opsWrapper"> <div class="published-time">',h+=e(a.quick_time),h+='<a href="" class="reportComment">\u4e3e\u62a5</a></div> <div class="quick-comment_ops"> <a href="javascript:;" class="hug">\u559c\u6b22</a> ',a.isConversation&&(h+=' <a href="" class="see-all_dialog" data-diaid="',h+=e(a.quick_diaId),h+='">\u67e5\u770b\u6240\u6709\u5bf9\u8bdd</a> '),h+=' <a href="" class="quick-replay_btn last">\u56de\u590d</a> </div> </div> </li> '}),h+=" ",f&&(h+=' <li class="nextPage-comment_btn" data-next= "',h+=e(g),h+='"> \u67e5\u770b\u5168\u90e8 </li> '),new k(h)}),/*v:1*/
a("doc-ans",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return f+="<ul> ",c(d,function(a){f+=' <li data-id="',f+=e(a.id),f+='" class="post-item"> <div class="post-item_photo"><a href="',f+=e(a.authorLink),f+='"><img src="',f+=e(a.authorPicLink),f+='" alt="',f+=e(a.authorName),f+='"></a></div> <div class="post-item_con post-repost_wrapper"> <div class="post-repost"> <div class="repost-con"> ',f+=e(a.repostCon),f+=' </div> </div> <div class="post-item_title"> <a class="post-item_author">',f+=e(a.authorName),f+='</a> <a href="',f+=e(a.postTitleLink),f+='">',f+=e(a.postTitle),f+="</a> </div> ",a.hasExpand?(f+=' <div class="post-item_pro"> ',f+=e(a.postCon_a),f+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',f+=e(a.postCon_b),f+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(f+=' <div class="post-item_pro"> ',f+=e(a.postCon_a),f+=" </div> "),f+=' <div class="original-post-info"> <span class="time">',f+=e(a.oritime),f+='</span> <a href="',f+=e(a.postTitleLink),f+='">\u76f8\u5173\u8ba8\u8bba(',f+=e(a.oricomment),f+=')</a> </div> <div class="post-item_info"> <div class="info-group"> ',f+=e(a.postTime),f+=' <span class="post-from">\u6765\u81ea<a href="',f+=e(a.postGroLink),f+='">',f+=e(a.postGroName),f+='</a></span> <a href="javascript:;" class="reportPost">\u4e3e\u62a5</a> </div> <div class="info-ops"> ',a.hashuged?(f+=' <a class="huged" href="javascript:;" title="\u559c\u6b22" data-repeat=true>\u5df2\u559c\u6b22(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "):(f+=' <a class="hug" href="javascript:;" title="\u559c\u6b22"><span class="tit">\u559c\u6b22</span>(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "),f+=" ",f+=a.hasCollected?' <a class="collect collected" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect collected" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ':' <a class="collect" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ',f+=' <a href="javascript:;" class="repost" >\u8f6c\u53d1(<span class="num">',f+=e(a.repostNum),f+='</span>)</a> <a class="post-comment last" href="javascript:;" title="\u6211\u8981\u8bc4\u8bba" data-comment="',f+=e(a.hasComment),f+='">\u8bc4\u8bba(<span class="num">',f+=e(a.CommentNum),f+='</span>)</a> <a href="javascript:;" class="post-comment_up last">\u6536\u8d77\u8bc4\u8bba</a> </div> </div> </div> </li> '}),f+=" </ul>",new k(f)}),/*v:2*/
a("doc-ask",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return f+="<ul> ",c(d,function(a){f+=' <li> <div class="doc-pic"> <a href=""><img src="',f+=e(a.img_link),f+='" alt=""></a> </div> <div class="doc-con authentic"> <div class="doc_name">',f+=e(a.doc_name),f+='<i></i></div> <div class="doc-ask_box"><a href="" class="doc-follow">\u5173\u6ce8</a></div> <div class="doc-ins">',f+=e(a.doc_ins),f+="</div> </div> </li> "}),f+=" </ul>",new k(f)}),/*v:5*/
a("faceCard_template",function(a){"use strict";var b=this,c=(b.$helpers,b.$string),d=a.spaceLink,e=a.picLink,f=a.personName,g=a.spacLink,h=a.sex,i=a.loc,j=a.groupLink,l=a.groupNum,m=a.followLink,n=a.followNum,o=a.fansLink,p=a.fansNum,q=a.profile,r=a.isFollowed,s=a.uid,t="";return t+='<div class="tooltip-inner"> <div class="info"> <div class="card"> <div class="headpic"> <a href="',t+=c(d),t+='" target="_blank"> <img src="',t+=c(e),t+='" alt="',t+=c(f),t+='" width="50px" height="50px"> </a> </div> <div class="content"> <div class="item"> <a href="',t+=c(g),t+='" target="_blank" class="name">',t+=c(f),t+='</a> </div> <div class="item"> <span class="m head">',t+=c(h),t+="</span>&nbsp;&nbsp;",t+=c(i),t+=' </div> <div class="item"> <span>\u5c0f\u7ec4&nbsp;<a href="',t+=c(j),t+='" target="_blank">',t+=c(l),t+='</a></span>&nbsp;&nbsp;&nbsp; <span>\u5173\u6ce8&nbsp;<a href="',t+=c(m),t+='" target="_blank">',t+=c(n),t+='</a></span>&nbsp;&nbsp;&nbsp; <span>\u7c89\u4e1d&nbsp;<a href="',t+=c(o),t+='" target="_blank">',t+=c(p),t+='</a></span> </div> </div> </div> <div class="desc"><label>\u4e2a\u4eba\u7b80\u4ecb\uff1a</label><span>',t+=c(q),t+='</span> </div> </div> <div class="operations"> <div class="relations"> ',r?(t+=' <div class="followed"> <span class="onefollow">\u5df2\u5173\u6ce8&nbsp;|&nbsp;</span><a data-uid="',t+=c(s),t+='" class="removeFriend" href="javascript:;">\u53d6\u6d88</a> <a href="javascript:;" class="addFriend" data-uid="',t+=c(s),t+='">\u52a0\u5173\u6ce8</a> </div> '):(t+=' <div class="follow"> <span class="onefollow">\u5df2\u5173\u6ce8&nbsp;|&nbsp;</span><a data-uid="',t+=c(s),t+='" class="removeFriend">\u53d6\u6d88</a> <a href="javascript:;" class="addFriend" data-uid="',t+=c(s),t+='">\u52a0\u5173\u6ce8</a> </div> '),t+=' </div> <div class="send-msg-wrapper"><a href="javascript:;" data-uid="',t+=c(s),t+='" data-user="',t+=c(f),t+='" class="send-msg">\u79c1\u4fe1</a></div> </div> </div>',new k(t)}),/*v:1*/
a("follow-list-template",""),/*v:1*/
a("group-recommend_template",function(a){"use strict";var b=this,c=(b.$helpers,b.$string),d=a.cat,e=a.hasDoc,f=a.group,g=a.doc,h=b.$each,i=(a.value,a.$index,a.hasMore),j=a.type,l=a.hasPatient,m=a.patient,n="";return n+='<li class="item"> <div class="list-item" data-id="',n+=c(d),n+='"> <div class="bd"> ',e&&(n+=" <dl> <dt>\u6d3b\u8dc3",n+=c(f),n+="\u533b\u751f(",n+=c(g.number),n+=")</dt> <dd> <ul> ",h(g.list,function(a){n+=' <li> <div class="face"><a href="',n+=c(a.face),n+='"><img src="',n+=c(a.img_link),n+='" alt="',n+=c(a.name),n+='"></a></div> <div class="info"> <div class="name">',n+=c(a.name),n+="</div> ",a.followed?(n+=' <div class="followed" data-id="',n+=c(a.cid),n+='">\u5df2\u5173\u6ce8</div> '):(n+=' <div class="follow" data-id="',n+=c(a.cid),n+='">\u5173\u6ce8</div> '),n+=" </div> </li> "}),n+=" </ul> ",i&&(n+=' <a href="',n+=c(g.more),n+='" class="more" data-type="',n+=c(j),n+='">\u66f4\u591a...</a> '),n+=" </dd> </dl> "),n+=" ",l&&(n+=" <dl> <dt>\u6d3b\u8dc3",n+=c(f),n+="\u75c5\u53cb(",n+=c(m.number),n+=")</dt> <dd> <ul> ",h(m.list,function(a){n+=' <li> <div class="face"><a href="',n+=c(a.face),n+='"><img src="',n+=c(a.img_link),n+='" alt="',n+=c(a.name),n+='"></a></div> <div class="info"> <div class="name">',n+=c(a.name),n+="</div> ",a.followed?(n+=' <div class="followed" data-id="',n+=c(a.cid),n+='">\u5df2\u5173\u6ce8</div> '):(n+=' <div class="follow" data-id="',n+=c(a.cid),n+='">\u5173\u6ce8</div> '),n+=" </div> </li> "}),n+=" </ul> ",i&&(n+=' <a href="',n+=c(m.more),n+='" class="more" data-type="',n+=c(j),n+='">\u66f4\u591a...</a> '),n+=" </dd> </dl> "),n+=" </div> </div> </li>",new k(n)}),/*v:1*/
a("interview-item-template",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return c(d,function(a){f+=' <li data-id="',f+=e(a.postId),f+='" class="post-item"> <div class="post-item_photo"> <a href="',f+=e(a.authorLink),f+='" class="cardInfo" data-id="',f+=e(a.authorId),f+='"> <img src="',f+=e(a.authorPicLink),f+='" alt="',f+=e(a.authorName),f+='"> </a> </div> <div class="post-item_con"> <a class="post-item_author cardInfo" href="',f+=e(a.authorLink),f+='" data-id="',f+=e(a.authorId),f+='">',f+=e(a.authorName),f+="</a> ",a.hasExpand?(f+=' <div class="post-item_pro"> ',f+=e(a.postCon_a),f+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',f+=e(a.postCon_b),f+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(f+=' <div class="post-item_pro"> ',f+=e(a.postCon_a),f+=" </div> "),f+=' <div class="post-item_info"> <div class="info-group">',f+=e(a.postTime),f+=' <span class="post-from">\u6765\u81ea<a href="',f+=e(a.postGroLink),f+='">',f+=e(a.postGroName),f+='</a></span> <a href="" class="reportPost">\u4e3e\u62a5</a> </div> <div class="info-ops"> ',a.hashuged?(f+=' <a class="huged" href="javascript:;" title="\u559c\u6b22" data-repeat=true>\u5df2\u559c\u6b22(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "):(f+=' <a class="hug" href="javascript:;" title="\u559c\u6b22"><span class="tit">\u559c\u6b22</span>(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "),f+=" ",f+=a.hasCollected?' <a class="collect collected" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect collected" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ':' <a class="collect" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ',f+=' <a href="javascript:;" class="repost" >\u8f6c\u53d1(<span class="num">',f+=e(a.repostNum),f+='</span>)</a> <a class="post-comment last" href="javascript:;" title="\u6211\u8981\u8bc4\u8bba" data-comment="',f+=e(a.hasComment),f+='">\u8bc4\u8bba(<span class="num">',f+=e(a.CommentNum),f+='</span>)</a> <a href="javascript:;" class="post-comment_up last">\u6536\u8d77\u8bc4\u8bba</a> </div> </div> </div> </li> '}),new k(f)}),/*v:4*/
a("med-comment-template",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return c(d,function(a){f+=' <li class="post-item" data-id="',f+=e(a.postId),f+='"> <div class="pic"><a href="',f+=e(a.authorLink),f+='" class="cardInfo" data-id="',f+=e(a.authorId),f+='"> <img src="',f+=e(a.authorPicLink),f+='"> </a> </div> <div class="detail"> <div class="name"><a href="',f+=e(a.authorLink),f+='" class="cardInfo" data-id="',f+=e(a.authorId),f+='">',f+=e(a.authorName),f+='</a></div> <div class="score">\u7597\u6548:<span class="number">',f+=e(a.effectNum),f+='</span>\u5b89\u5168\u5ea6:<span class="number">',f+=e(a.safetyNum),f+='</span>\u6027\u4ef7\u6bd4:<span class="number">',f+=e(a.priceNum),f+='</span></div> <div class="con">',f+=e(a.postCon),f+='</div> <div class="post-item_info"> <div class="info-group">',f+=e(a.postTime),f+=' <span class="post-from">\u6765\u81ea<a href="',f+=e(a.postGroLink),f+='">',f+=e(a.postGroName),f+='</a></span> <a href="" class="reportPost">\u4e3e\u62a5</a> </div> <div class="info-ops"> ',a.hashuged?(f+=' <a class="huged" href="javascript:;" title="\u559c\u6b22" data-repeat=true>\u5df2\u559c\u6b22(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "):(f+=' <a class="hug" href="javascript:;" title="\u559c\u6b22"><span class="tit">\u559c\u6b22</span>(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "),f+=" ",f+=a.hasCollected?' <a class="collect collected" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect collected" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ':' <a class="collect" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ',f+=' <a href="javascript:;" class="repost" >\u8f6c\u53d1(<span class="num">',f+=e(a.repostNum),f+='</span>)</a> <a class="post-comment last" href="javascript:;" title="\u6211\u8981\u8bc4\u8bba" data-comment="',f+=e(a.hasComment),f+='">\u8bc4\u8bba(<span class="num">',f+=e(a.CommentNum),f+='</span>)</a> <a href="javascript:;" class="post-comment_up last">\u6536\u8d77\u8bc4\u8bba</a> </div> </div> </div> </li> '}),new k(f)}),/*v:1*/
a("msg-add_template",function(a){"use strict";var b=this,c=(b.$helpers,b.$string),d=a.link,e=a.facelink,f=a.name,g=a.con,h="";return h+='<div class="msg_dialogue_list msg_dialist_l"> <div class="msg_dialist_box"> <div class="msg_dialist_pic"><a href="',h+=c(d),h+='"><img src="',h+=c(e),h+='" alt="',h+=c(f),h+='"></a></div> <div class="msg_dialist_content"> <div class="msg_arrow"><em>\u25c6</em><span>\u25c6</span></div> <div class="msg_dialist_main"> <div class="msg_diamain_box"> <div class="msg_diamain_con"> <p class="msg_dia_txt">',h+=c(g),h+='</p> <div class="msg_ctrl"></div> </div> </div> </div> </div> </div> </div>',new k(h)}),/*v:11*/
a("post-list",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f=a.isMypost,g=a.postTitle,h="";return h+="<ul> ",c(d,function(a){h+=' <li data-id="',h+=e(a.postId),h+='" class="post-item"> <div class="post-item_photo"><a href="',h+=e(a.authorLink),h+='" class="cardInfo" data-id="',h+=e(a.authorId),h+='"><img src="',h+=e(a.authorPicLink),h+='" alt="',h+=e(a.authorName),h+='"></a></div> ',h+=a.isRepost?' <div class="post-item_con post-repost_wrapper"> ':' <div class="post-item_con"> ',h+=' <a class="post-item_author cardInfo" href="',h+=e(a.authorLink),h+='" data-id="',h+=e(a.authorId),h+='">',h+=e(a.authorName),h+="</a> ",f&&(h+=' <div class="post-ops"> <i class="icon"></i> <ul class="ops-menu"> <li><a href="javascript:;" class="editPost">\u4fee\u6539</a></li> <li><a href="javascript:;" class="removePost">\u5220\u9664</a></li> </ul> </div> '),h+=" ","post"==a.postType?(h+=" ",a.isRepost?(h+=' <div class="post-text">',h+=e(a.postCon),h+='</div> <div class="retweet-post"> <a class="post-item_author cardInfo" href="',h+=e(a.reauthorLink),h+='" data-id="',h+=e(a.reauthorId),h+='">',h+=e(a.reauthorName),h+='</a> <h2><a href="',h+=e(a.repostLink),h+='" class="post-title-text">',h+=e(a.repostTitle),h+="</a></h2> ",a.rehasExpand?(h+=' <div class="post-item_pro"> ',h+=e(a.repostCon_a),h+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',h+=e(a.repostCon_b),h+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(h+=' <div class="post-item_pro"> ',h+=e(a.repostCon_a),h+=" </div> "),h+=' <div class="original-post-info"> <span class="time">',h+=e(a.oritime),h+='</span> <a href="',h+=e(a.postTitleLink),h+='">\u76f8\u5173\u8ba8\u8bba(',h+=e(a.oricomment),h+=")</a> </div> </div> "):(h+=' <h2><a href="',h+=e(a.postLink),h+='" class="post-title-text">',h+=e(g),h+="</a></h2> ",a.hasExpand?(h+=' <div class="post-item_pro"> ',h+=e(a.postCon_a),h+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',h+=e(a.postCon_b),h+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(h+=' <div class="post-item_pro"> ',h+=e(a.postCon_a),h+=" </div> "),h+=" "),h+=" "):"medcine"==a.postType?(h+=' <div class="post-text">',h+=e(a.postCon),h+='</div> <div class="retweet-post"> <a class="post-item_author " href="',h+=e(a.medLink),h+='">',h+=e(a.medName),h+=" ",a.commonMedname&&(h+=' <span class="subname">\u901a\u7528\u540d\u79f0\uff1a',h+=e(a.commonMedname),h+="</span> "),h+=' </a> <div class="post-item_pro"> <div class="score-wrapper"> <div class="all-average">\u7efc\u5408\u5747\u503c<b class="number">',h+=e(a.allNum),h+='</b></div> <div class="sep-average"> <div class="effect"> <span class="score">\u836f\u6548\u5747\u503c&nbsp;:<span class="num">',h+=e(a.effectNum),h+='</span></span><span class="percent-box"><em class="percent" style="width: ',h+=e(a.effectPer),h+='"></em></span><span class="evalute">\u597d<span class="num">',h+=e(a.effectPer),h+='</span></span> </div> <div class="safety"> <span class="score">\u5b89\u5168\u5ea6\u5747\u503c&nbsp;:<span class="num">',h+=e(a.safetyNum),h+='</span></span><span class="percent-box"><em class="percent" style="width: ',h+=e(a.safetyPer),h+=';"></em></span><span class="evalute">\u597d<span class="num">',h+=e(a.safetyPer),h+='</span></span> </div> <div class="price"> <span class="score">\u4ef7\u683c\u5747\u503c&nbsp;:<span class="num">',h+=e(a.priceNum),h+='</span></span><span class="percent-box"><em class="percent" style="width: ',h+=e(a.pricePer),h+=';"></em></span><span class="evalute">\u597d<span class="num">',h+=e(a.pricePer),h+='</span></span> </div> </div> </div> </div> <div class="original-post-info"> <span class="time">',h+=e(a.oritime),h+='</span> <a href="',h+=e(a.oriLink),h+='">\u76f8\u5173\u8ba8\u8bba(',h+=e(a.oricomment),h+=")</a> </div> </div> "):"answer"==a.postType?(h+=' <div class="post-text">',h+=e(a.postCon),h+='</div> <div class="retweet-post"> <a class="post-item_author cardInfo" href="',h+=e(a.reauthorLink),h+='" data-id="',h+=e(a.reauthorId),h+='">',h+=e(a.reauthorName),h+="</a> ",a.rehasExpand?(h+=' <div class="post-item_pro"> ',h+=e(a.repostCon_a),h+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',h+=e(a.repostCon_b),h+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(h+=' <div class="post-item_pro"> ',h+=e(a.repostCon_a),h+=" </div> "),h+=' <div class="original-post-info"> <span class="time">',h+=e(a.oritime),h+='</span> <a href="',h+=e(a.postTitleLink),h+='">\u76f8\u5173\u8ba8\u8bba(',h+=e(a.oricomment),h+=")</a> </div> </div> "):"ask"==a.postType?(h+=" ",a.hasExpand?(h+=' <div class="post-item_pro"> ',h+=e(a.postCon_a),h+=' <a href="javascript:;" class="post-expand"><i></i>\u5c55\u5f00</a> </div> <div class="post-item_pro see-all"> ',h+=e(a.postCon_b),h+=' <a href="javascript:;" class="post-packUp"><i></i>\u6536\u8d77</a> </div> '):(h+=' <div class="post-item_pro"> ',h+=e(a.postCon_a),h+=" </div> "),h+=" "):(h+=' <div class="post-text">',h+=e(a.postCon),h+='</div> <div class="retweet-post"> <a class="post-item_author cardInfo" href="',h+=e(a.reauthorLink),h+='" data-id="',h+=e(a.reauthorId),h+='">',h+=e(a.reauthorName),h+='</a> <h2><a href="',h+=e(a.repostLink),h+='" class="post-title-text">',h+=e(a.repostTitle),h+='</a></h2> <div class="post-item_pro"> <div>',h+=e(a.hashelp),h+='<span class="use-time">\u4f7f\u7528\uff1a',h+=e(a.useTime),h+="</span></div> <div>",h+=e(a.therapycon),h+='</div> </div> <div class="original-post-info"> <span class="time">',h+=e(a.oritime),h+='</span> <a href="',h+=e(a.oriLink),h+='">\u76f8\u5173\u8ba8\u8bba(',h+=e(a.oricomment),h+=")</a> </div> </div> "),h+=' <div class="post-item_info"> <div class="info-group">',h+=e(a.postTime),h+=' <span class="post-from">\u6765\u81ea<a href="',h+=e(a.postGroLink),h+='">',h+=e(a.postGroName),h+='</a></span> <a href="" class="reportPost">\u4e3e\u62a5</a> </div> <div class="info-ops"> ',a.hashuged?(h+=' <a class="huged" href="javascript:;" title="\u559c\u6b22" data-repeat=true>\u5df2\u559c\u6b22(<span class="num">',h+=e(a.hugNum),h+="</span>)</a> "):(h+=' <a class="hug" href="javascript:;" title="\u559c\u6b22"><span class="tit">\u559c\u6b22</span>(<span class="num">',h+=e(a.hugNum),h+="</span>)</a> "),h+=" ",h+=a.hasCollected?' <a class="collect collected" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect collected" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ':' <a class="collect" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ',h+=' <a href="javascript:;" class="repost" >\u8f6c\u53d1(<span class="num">',h+=e(a.repostNum),h+='</span>)</a> <a class="post-comment last" href="javascript:;" title="\u6211\u8981\u8bc4\u8bba" data-comment="',h+=e(a.hasComment),h+='">\u8bc4\u8bba(<span class="num">',h+=e(a.CommentNum),h+='</span>)</a> <a href="javascript:;" class="post-comment_up last">\u6536\u8d77\u8bc4\u8bba</a> </div> </div> </div> </li> '}),h+=" </ul>",new k(h)}),/*v:1*/
a("recom-template",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return c(d,function(a){f+=' <div class="user-item"> <div class="avator"><a href="',f+=e(a.recomLink),f+='"><img src="',f+=e(a.recomPicLink),f+='"></a></div> <div class="info-wrapper"> <div class="name">',f+=e(a.recomName),f+='</div> <div class="follow-btn" data-id = "',f+=e(a.recomId),f+='"> +\u52a0\u5173\u6ce8 </div> </div> </div> '}),new k(f)}),/*v:3*/
a("see-all_template",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return f+='<ul id="comment-dialog"> ',c(d,function(a){f+=' <li class="quick-comment_wrapper" data-cid="',f+=e(a.quick_cId),f+='"> <div class="quick-comment_author"> <a href="',f+=e(a.quick_link),f+='"> <img src="',f+=e(a.quick_Piclink),f+='" title="',f+=e(a.quick_author),f+='"> </a> </div> <div class="quick-comment_conWrapper"> ',a.isConversation?(f+=' <p> <a href="',f+=e(a.quick_link),f+='" class="quick-comment_nick">',f+=e(a.quick_author),f+='</a>\u56de\u590d<a href="',f+=e(a.quickTo_link),f+='" class="quick-comment_to">',f+=e(a.quickTo_author),f+="</a>: </p> "):(f+=' <p> <a href="',f+=e(a.quick_link),f+='" class="quick-comment_nick">',f+=e(a.quick_author),f+="</a>: </p> "),f+=' <p class="quick-comment-con"> ',f+=e(a.quick_con),f+=' </p> </div> <div class="quick-comment_opsWrapper"> <div class="published-time">',f+=e(a.quick_time),f+='</div> <div class="quick-comment_ops"> <a href="javascript:;" class="hug">\u559c\u6b22</a> <a href="" class="quick-replay_btn last">\u56de\u590d</a> </div> </div> </li> '}),f+=" </ul>",new k(f)}),/*v:2*/
a("single-comment",function(a){"use strict";var b=this,c=(b.$helpers,b.$string),d=a.quick_cId,e=a.quick_link,f=a.quick_Piclink,g=a.quick_author,h=a.isConversation,i=a.quickTo_link,j=a.quickTo_author,l=a.quick_con,m=a.quick_time,n=a.quick_diaId,o="";return o+='<li class="quick-comment_wrapper" data-id="',o+=c(d),o+='"> <div class="quick-comment_author"> <a href="',o+=c(e),o+='"> <img src="',o+=c(f),o+='" title="',o+=c(g),o+='"> </a> </div> <div class="quick-comment_conWrapper"> ',h?(o+=' <p> <a href="',o+=c(e),o+='" class="quick-comment_nick">',o+=c(g),o+='</a>\u56de\u590d<a href="',o+=c(i),o+='" class="quick-comment_to">',o+=c(j),o+="</a>: </p> "):(o+=' <p> <a href="',o+=c(e),o+='" class="quick-comment_nick">',o+=c(g),o+="</a>: </p> "),o+=' <p class="quick-comment-con"> ',o+=c(l),o+=' </p> </div> <div class="quick-comment_opsWrapper"> <div class="published-time">',o+=c(m),o+='</div> <div class="quick-comment_ops"> ',h&&(o+=' <a href="" class="see-all_dialog" data-diaid="',o+=c(n),o+='">\u67e5\u770b\u6240\u6709\u5bf9\u8bdd</a> '),o+=' <a href="" class="delete-comment last">\u5220\u9664</a> </div> </div> </li>',new k(o)}),/*v:2*/
a("single-doc_ask",function(a){"use strict";var b=this,c=(b.$helpers,b.$string),d=a.img_link,e=a.doc_name,f=a.doc_ins,g="";return g+='<li> <div class="doc-pic"> <a href=""><img src="',g+=c(d),g+='" alt=""></a> </div> <div class="doc-con authentic"> <div class="doc_name">',g+=c(e),g+='<i></i></div> <div class="doc-ask_box"><a href="" class="doc-follow">\u5173\u6ce8</a></div> <div class="doc-ins">',g+=c(f),g+="</div> </div> </li>",new k(g)}),/*v:2*/
a("tag-edit-template",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return f+="<li> ",c(d,function(a){f+=' <div class="tagItem"> <div class="tagItem-hd">',f+=e(a.tagCat),f+='</div> <div class="tagItem-bd"> ',c(a.tagList,function(a){f+=" ",a.isSelected?(f+=' <a href="javascript:;" data-cat="',f+=e(a.cat),f+='" data-id="',f+=e(a.tagId),f+='" class="selected">',f+=e(a.tagName),f+="</a> "):(f+=' <a href="javascript:;" data-cat="',f+=e(a.cat),f+='" data-id="',f+=e(a.tagId),f+='">',f+=e(a.tagName),f+="</a> "),f+=" "}),f+=" </div> </div> "}),f+=" </li>",new k(f)}),/*v:1*/
a("treatment-comment-template",function(a){"use strict";var b=this,c=(b.$helpers,b.$each),d=a.list,e=(a.value,a.i,b.$string),f="";return c(d,function(a){f+=' <li class="post-item" data-id="',f+=e(a.postId),f+='"> <div class="pic"><a href="',f+=e(a.authorLink),f+='" class="cardInfo" data-id="',f+=e(a.authorId),f+='"> <img src="',f+=e(a.authorPicLink),f+='"> </a> </div> <div class="detail"> <div class="name"><a href="',f+=e(a.authorLink),f+='" class="cardInfo" data-id="',f+=e(a.authorId),f+='">',f+=e(a.authorName),f+='</a></div> <div class="effect"><span class="help">',f+=e(a.hashelp),f+='</span>\u4f7f\u7528&nbsp;:&nbsp;<span class="time">',f+=e(a.useTime),f+='</span></div> <div class="con">',f+=e(a.therapycon),f+='</div> <div class="post-item_info"> <div class="info-group">',f+=e(a.postTime),f+=' <span class="post-from">\u6765\u81ea<a href="',f+=e(a.postGroLink),f+='">',f+=e(a.postGroName),f+='</a></span> <a href="" class="reportPost">\u4e3e\u62a5</a> </div> <div class="info-ops"> ',a.hashuged?(f+=' <a class="huged" href="javascript:;" title="\u559c\u6b22" data-repeat=true>\u5df2\u559c\u6b22(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "):(f+=' <a class="hug" href="javascript:;" title="\u559c\u6b22"><span class="tit">\u559c\u6b22</span>(<span class="num">',f+=e(a.hugNum),f+="</span>)</a> "),f+=" ",f+=a.hasCollected?' <a class="collect collected" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect collected" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ':' <a class="collect" href="javascript:;" title="\u89c9\u5f97\u6709\u7528\uff0c\u6536\u85cf\u4e0b\u5427">\u6536\u85cf</a> <a class="un-collect" href="javascript:;">\u53d6\u6d88\u6536\u85cf</a> ',f+=' <a href="javascript:;" class="repost" >\u8f6c\u53d1(<span class="num">',f+=e(a.repostNum),f+='</span>)</a> <a class="post-comment last" href="javascript:;" title="\u6211\u8981\u8bc4\u8bba" data-comment="',f+=e(a.hasComment),f+='">\u8bc4\u8bba(<span class="num">',f+=e(a.CommentNum),f+='</span>)</a> <a href="javascript:;" class="post-comment_up last">\u6536\u8d77\u8bc4\u8bba</a> </div> </div> </div> </li> '}),new k(f)})}();
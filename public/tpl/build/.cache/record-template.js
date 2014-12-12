/*TMODJS:{"version":1,"md5":"7baf9e6354a2982b81842709ebb3f8af"}*/
template('record-template',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,value=$data.value,$out='';$out+='<div class="tab"> <div class="tab-hd"> <a href="javascript;">';
$out+=$string(value.cat);
$out+='</a> </div> <div class="tab-bd"> <div class="item"> <table> <tr> <td>项目名称</td> <td>结果</td> <td>参考值</td> </tr> </table> </div> </div> </div>';
return new String($out);
});
seajs.config({
	// 别名配置
	alias: {
		"seajs-css"	 : '/public/lib/seajs/seajs-css',
		"mock"       : 'http://mockjs.com/dist/mock.js',
		'jquery'     : '/public/lib/jquery/jquery-1.7.2.min',
		'post-handle': '/public/component/logic/post-handle',
		'bxslider'   : '/public/component/base/jquery.bxslider.min',
		'dialog'     : '/public/component/base/dialog/dialog',
		'Pagination' : '/public/component/base/jquery.twbsPagination.min',
		'uploadify'  : '/public/component/base/uploadify/jquery.uploadify.min',
		'validform'  : '/public/component/base/validform/Validform_v5.3.2_min',
		'password'  : '/public/component/base/validform/passwordStrength-min',
		'login'      : '/public/component/logic/login.js',
		'autosize'   : '/public/component/base/jquery.autosize.min',
		'qqFace'     : '/public/component/base/qqFace/jquery.qqFace',
		'webuploader': '/public/component/base/webuploader/webuploader.min',
		'birthday'   : '/public/component/base/jquery.birthday',
		'distpicker' : '/public/component/base/distpicker.min',
		'placeholderfriend':'/public/component/base/placeholderfriend',
		'imgareaselect' : '/public/component/base/jquery.imgareaselect.min',
		'goTop'      : '/public/component/base/jquery.goToTop',
		'index'      :'/public/page/space/index',
		'common'     :'/public/page/index/common',
		'template'   :'/public/tpl/build/template',
		'cardFace'   :'/public/component/logic/cardFace',
		'caret'      :'/public/component/base/jquery.caret.min',
		'atwho'      :'/public/component/base/jquery.atwho.min',
		'atWho'      :'/public/component/logic/atWho',
		'imgupload'  :'/public/component/logic/webuploader'
 
	},
	// 预加载项

	preload: ['jquery'],
	//preload: ['jquery', 'seajs-text', 'seajs-combo'],

	// 调试模式
	debug: true,

	// Sea.js 的基础路径
	//base: 'http://example.com/path/to/base/',

	// 文件编码
	charset: 'utf-8'
});


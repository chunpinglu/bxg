define(function(){
    //封装一个获取链接中属性参数的值的函数
			function getQueryUrl(){
				var params=location.search.slice(1).split("&");
				var obj={};
				for(var i=0;i<params.length;i++){
					obj[params[i].split("=")[0]]=params[i].split("=")[1];
				}
				return obj;
			}
			return getQueryUrl;
})

	// NProgress.start();

	// NProgress.done();

	// $('.navs ul').prev('a').on('click', function () {
	// 	$(this).next().slideToggle();
	// });

	define(["jquery","template",'Nprogress',"cookie"],function($,template,NProgress){
		NProgress.start();
		$(function(){
			NProgress.done();
			if(location.pathname!="/dashboard/login"){
				if(!$.cookie("PHPSESSID")){
					location.href="/dashboard/login";
				}
	
				var userinfo=JSON.parse($.cookie("userinfo"));
				console.log(userinfo);
				var profile=$("#profile");
				profile.html(template("profile_tpl",userinfo));
			}



			//退出登录功能
			$("#logout_btn").click(function(){
				$.ajax({
					url:"/api/logout",
					type:"post",
					success:function(data){
						if(data.code==200){
							location.href="/dashboard/login";
						}
					}
				})
			})


			//导航栏效果实现
			$(".navs>ul>li>ul").parent().click(function(){
				$(this).children("ul").stop().slideToggle();
			})

			//让当前链接的菜单项高亮
			$(".navs a").each(function(index,ele){
				if($(ele).attr("href")==location.pathname){
					//让当前a标签的父元素添加一个active类
					$(ele).addClass("active");
				}
			})

			//给每个页面中的ajax请求添加进度条
			$(document).ajaxStart(function(){
				NProgress.start();
			})

			$(document).ajaxStop(function(){
				NProgress.done();
			})

			

		})   
	})


	
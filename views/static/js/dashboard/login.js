define(["jquery","cookie"],function($){
    $(function(){
        //1.获取登录按钮，注册点击事件

        //1.获取表单，注册提交事件
        $("form").submit(function(){
            //1.获取用户登录的信息
            var username=$("#tc_name").val();
            var pass=$("#tc_pass").val();
            if(username.trim()==""){
                alert("请输入用户名");
                return false;
            }

            if(pass.trim()==""){
                alert("请输入密码");
                return false;
            }

            //2.要将数据发送给后台，让后台进行验证
            //2.1数据接口地址是什么
            //2.2请求的方式是什么  post
            //2.3请求要的参数是什么  tc_name  tc_pass
            $.ajax({
                url:"http://studyit.com/api/login",
                type:"post",
                data:{
                    tc_name:username,
                    tc_pass:pass
                },
                success:function(data){
                    console.log(data);
                    if(data.code==200){
                        $.cookie("userinfo",JSON.stringify(data.result),{expires:365,path:"/"});
                        window.location.href="/";
                    }
                }
            })


            //阻止表单的默认提交事件
            return false;

        })

    })
})
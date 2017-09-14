define(['jquery','template','utils','bootstrap','datepicker','datepickerCN','validate'],function($,template,getQueryUrl){
    $(function(){
        // var isEdit=false;
        var id=getQueryUrl().tc_id;     
        console.log(id);
        if(!id){
            //1.添加讲师
            var obj={
                title:"讲师添加",
                btnText:"添 加"
            };
            $(".body,.teacher").html(template("edit-tpl",obj));

             //使用datepicker插件
             $("input[name=tc_join_date]").datepicker({
                autoclose:true,
                format:'yyyy-mm-dd',
                language:'zh-CN'
            })

            //使用validate进行表单的验证
            $("form").validate({
                sendForm:false,
                onBlur:true,
                valid:function(){
                    // $(".add-btn").click(function(){
                        var data=$("form").serialize();
                        $.ajax({
                            url:"/api/teacher/add",
                            type:"post",
                            data:data,
                            success:function(data){
                                if(data.code==200){
                                    console.log(data);
                                    location.href="/teacher/teacher_list";
                                }
                            }
                        })
                    // })

                },
                description:{
                    name:{
                        required:"姓名不能为空"
                    },
                    password:{
                        required:"密码不能为空",
                        pattern:"请输入6到15位的字母或数字"
                    },
                    date:{
                        required:"请输入入职日期"
                    }
                },
                eachValidField:function(){
                    // console.log($(this));
                    $(this).parent().parent().removeClass("has-error").addClass("has-success");

                },
                eachInvalidField:function(){
                    $(this).parent().parent().removeClass("has-success").addClass("has-error");

                }


            })

            // $(".add-btn").click(function(){

            //     var data=$("form").serialize();
            //     $.ajax({
            //         url:"/api/teacher/add",
            //         type:"post",
            //         data:data,
            //         success:function(data){
            //             if(data.code==200){
            //                 console.log(data);
            //                 location.href="/teacher/teacher_list";
            //             }
            //         }
            //     })

            // })
            
        }else{
            //2.编辑讲师
            // var obj={
            //     title:"讲师编辑",
            //     btnText:"保 存"
            // }
            // $(".body,.teacher").html(template("edit-tpl",obj));
            $.ajax({
                url:"/api/teacher/edit",
                type:"get",
                data:{
                    tc_id:id
                },
                success:function(data){
                    if(data.code==200){
                        console.log(data);
                        data.result.title="讲师编辑";
                        data.result.btnText="保 存";
                        $(".body,.teacher").html(template("edit-tpl",data.result));

                         //使用datepicker插件
                        $("input[name=tc_join_date]").datepicker({
                            autoclose:true,
                            format:'yyyy-mm-dd',
                            language:'zh-CN'
                        })

                        $(".add-btn").click(function(){                      
                                            var data=$("form").serialize();
                                            $.ajax({
                                                url:"/api/teacher/update",
                                                type:"post",
                                                data:data,
                                                success:function(data){
                                                    if(data.code==200){
                                                        console.log(data);
                                                        location.href="/teacher/teacher_list";
                                                    }
                                                }
                                            })
                            
                                        })
                    }
                }
            })

        }

        
            // //使用datepicker插件
            // $("input[name=tc_join_date]").datepicker({
            //     autoclose:true,
            //     format:'yyyy-mm-dd',
            //     language:'zh-CN'
            // })


        
    })

})
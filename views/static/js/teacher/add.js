define(['jquery','template','utils','bootstrap'],function($,template,getQueryUrl){
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

            $(".add-btn").click(function(){

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

            })
            
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
    })

})
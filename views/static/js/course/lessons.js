define(["jquery","template","utils","bootstrap","form"],function($,template,getQueryUrl){
    $(function(){
        var id=getQueryUrl().cs_id;
        $.ajax({
            url:"/api/course/lesson",
            data:{
                cs_id:id
            },
            success:function(data){
                if(data.code == 200){
                    console.log(data);
                    $(".steps").html(template("lessons_tpl",data.result));
                }
            }
        })

        //添加课时
        $(".steps").on("click","#modal-btn,#save-btn",function(){
            $("#chapterModal").modal("show");
            if($(this).attr("id")=="modal-btn"){
                //添加课时
                var obj={
                    title:"添加课时",
                    btnText:"添 加",
                    url:"/api/course/chapter/add"
                };
                $("#chapterModal").html(template("modal_tpl",obj));

            }else{
                //编辑课时
                var id=$(this).data("id");
                // console.log(id);
                $.ajax({
                    url:"/api/course/chapter/edit",
                    data:{
                        ct_id:id
                    },
                    success:function(data){
                        if(data.code == 200){
                            console.log(data);
                            data.result.title="编辑课时";
                            data.result.btnText="保 存";
                            data.result.url="/api/course/chapter/modify";
                            $("#chapterModal").html(template("modal_tpl",data.result));
                        }
                    }
                })

            }
        })

        //点击添加/保存按钮
        $("#chapterModal").on("click","#edit-btn",function(){
            $("form").ajaxSubmit({
                data:{
                    ct_cs_id:id,
                    ct_is_free:Number($("#is_free").prop("checked"))
                },
                success:function(data){
                    if(data.code == 200){
                        console.log(data);
                        $("#chapterModal").modal("hide");
                        $.ajax({
                            url:"/api/course/lesson",
                            data:{
                                cs_id:id
                            },
                            success:function(data){
                                if(data.code == 200){
                                    console.log(data);
                                    $(".lessons").html(template("lesson_list_tpl",data.result));
                                }
                            }
                        })
                    }
                }
            })
        })
    })
})
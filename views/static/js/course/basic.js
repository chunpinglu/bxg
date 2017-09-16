define(['jquery','utils','template','ckeditor','form'],function($,getQueryUrl,template,CKEDITOR){
    $(function(){
        var id=getQueryUrl().cs_id;
        $.ajax({
            url:"/api/course/basic",
            data:{
                cs_id:id
            },
            success:function(data){
                if(data.code == 200){
                    console.log(data);
                    $(".course-add").html(template("basic_tpl",data.result));
                    CKEDITOR.replace("cs_brief");
                    $("#save-btn").click(function(){
                        CKEDITOR.instances.cs_brief.updateElement();
                        $("form").ajaxSubmit({
                            url:"/api/course/update/basic",
                            type:"post",
                            data:{
                                cs_id:id
                            },
                            success:function(data){
                                if(data.code == 200){
                                    // console.log(data);
                                    location.href="/course/pic?cs_id="+id;
                                }
                            }
                        })
                        return false;


                    })
                }
            }
        })

    })
})
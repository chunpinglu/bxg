define(['jquery','template','utils','uploadify'],function($,template,getQueryUrl){
    var id=getQueryUrl().cs_id;
    $(function(){
        $.ajax({
            url:"/api/course/picture",
            data:{
                cs_id:id
            },
            success:function(data){
                if(data.code == 200){
                    console.log(data);
                    $(".steps").html(template("pic_tpl",data.result));
                    $("#select-btn").uploadify({
                       swf:"/views/assets/uploadify/uploadify.swf",
                       uploader:"/api/uploader/cover",
                       fileObjName:"cs_cover_original",
                       formData:{
                        cs_id:id
                       },
                       width:70,
                       height:30,
                       buttonClass:"btn btn-success btn-sm",
                       buttonText:"选择图片",
                       itemTemplate:"<p></p>",
                       onUploadSuccess:function(file,data,response){
                           data=JSON.parse(data);
                        //    console.log(data);
                           $(".preview img").attr("src",data.result.path);
                       }
                        
                    })
                    $("#select-btn-button").css("line-height",'1.5');
                }
            }
        })
    })
})
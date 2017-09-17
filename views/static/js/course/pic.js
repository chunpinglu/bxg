define(['jquery','template','utils','uploadify','jcrop'],function($,template,getQueryUrl){
    var id=getQueryUrl().cs_id;
    var x=0;
    var y=0;
    var w=0;
    var h=0;
    var jcrop_api = null;
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

                    //给图片的父容器添加事件cropstart cropmove 
                    $(".preview").on("cropstart cropmove",function(event,selection,coords){
                        x=coords.x;
                        y=coords.y;
                        w=coords.w;
                        h=coords.h;
                        console.log(x,y,w,h);
                    })

                    //图片上传插件uploadify
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

                           //在图片加载完成后再开启禁用按钮
                           $(".preview img")[0].onload=function(){
                                $("#crop-btn").attr("disabled",false);
                           }

                           //如果在上传图片之前已经有裁切图片的存在，那么需要先将裁切的图片移除，然后再上传图片
                            if(jcrop_api != null){
                                jcrop_api.destroy();
                                $("#crop-btn").text("裁切图片").data("status", "crop");
                            }
                       }                       
                    })
                    //修改图片上传按钮样式
                    $("#select-btn-button").css("line-height",'1.5');                 
                }
            }
        })

        //通过事件委托来注册事件
        //使用图片裁切插件或将数据传给后台
        $(".steps").on("click","#crop-btn",function(){
            var status=$(this).data("status");
            // console.log(status);
            if(status=="crop"){
                //图片裁切插件jcrop的使用
                $(".preview img").Jcrop({
                    // setSelect:[10,10,280,130],
                    // aspectRatio:0.5,
                    // maxSize:[300,150],
                    // minSize:[100,100],
                    boxWidth:400,
                    // boxHeight:160,
                    // edge:{n:10,s:-10,e:-10,w:10}
                },function(){
                    jcrop_api = this;
                    thumbnail = this.initComponent('Thumbnailer', { width: 240, height: 120, container: ".thumb" });
                })
                $(this).text("保存图片");
                $(".thumb>img").remove();
                $(this).data("status","save");
            }else{
                //将数据传给后台
                $.ajax({
                    url:"/api/course/update/picture",
                    type:"post",
                    data:{
                        cs_id:id,
                        x:x,
                        y:y,
                        w:w,
                        h:h
                    },
                    success:function(data){
                        if(data.code == 200){
                            console.log(data);
                            location.href="/course/lessons?cs_id="+data.result.cs_id;
                        }
                    }
                })
            }                           
            // return false;
        })
    })
})
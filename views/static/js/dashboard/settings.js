define(['jquery','ckeditor','template','form','datepicker','datepickerCN','region','uploadify'],function($,CKEDITOR,template){
    $(function(){
        $.ajax({
            url:"/api/teacher/profile",
            success:function(data){
                if(data.code == 200){
                    console.log(data);
                    $(".settings").html(template("settings_tpl",data.result));

                    //富文本编辑器的使用
                    CKEDITOR.replace("tc_introduce",{
                        toolbarGroups: [
                            { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                            // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                            // { name: 'links' },
                            { name: 'insert' },
                            // { name: 'forms' },
                            { name: 'tools' },
                            // { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
                            // { name: 'others' },
                            // '/',
                            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                            // { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                            // { name: 'styles' },
                            // { name: 'colors' },
                            // { name: 'about' }
                        ]
                    })

                    //省市区三级联动的使用
                    $("#selectWrap").region({
                        url:"/views/assets/jquery-region/region.json"
                    })

                    //头像上传插件uploadify的使用
                    $("#upfile").uploadify({
                        swf:"/views/assets/uploadify/uploadify.swf",
                        uploader:"/api/uploader/avatar",
                        fileObjName:"tc_avatar",
                        buttonText:"",
                        itemTemplate:"<p></p>",
                        height:120,
                        width:120,
                        onUploadSuccess:function(file,data,response){
                            var data=JSON.parse(data);
                            if(data.code == 200){
                                console.log(data);
                                $(".preview img").attr("src", data.result.path);
                            }
                            
                        }
                    })

                    //日期选择插件datepicker
                    $("input[name='tc_birthday']").datepicker({
                        format:"yyyy-mm-dd",
                        autoclose:true,
                        language:"zh-CN"
                    })
                    $("input[name='tc_join_date']").datepicker({
                        format:"yyyy-mm-dd",
                        autoclose:true,
                        language:"zh-CN"
                    })

                    //点击保存按钮发送ajax
                    $("#save-btn").click(function(){
                        CKEDITOR.instances.tc_introduce.updateElement();
                        $("form").ajaxSubmit({
                            success:function(data){
                                if(data.code == 200){
                                    console.log(data);
                                    // location.href="/dashboard/index";
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
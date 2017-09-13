define(["jquery","template","bootstrap"],function($,template){
    $(function(){
        //1.加载列表数据
        //1.1发送ajax请求
        $.ajax({
            url:"/api/teacher",
            type:"get",
            success:function(data){
                console.log(data);
               $("#teacher_list_tbody").html(template("teacher_list_tpl",data));
            }
        })

        //查看按钮(事件委托)
        $("#teacher_list_tbody").on("click",".check-info",function(){
            // alert("1");
            var id=$(this).parent().data("id");
            $.ajax({
                url:"/api/teacher/view",
                data:{
                    tc_id:id
                },
                success:function(data){
                    if(data.code==200){
                        console.log(data);
                        $(".modelWrap").html(template("model_tpl",data.result));
                        $("#teacherModal").modal("show");

                    }
                }
            })
            
            return false;
        })


        //注销或启用按钮
        $("#teacher_list_tbody").on("click",".handle-info",function(){
            var id=$(this).parent().data("id");
            var status=$(this).data("status");
            var _this=$(this);
            $.ajax({
                url:"/api/teacher/handle",
                type:"post",
                data:{
                    tc_id:id,
                    tc_status:status
                },
                success:function(data){
                    if(data.code==200){
                        console.log(data);
                        if(data.result.tc_status==0){
                            _this.html("注 销");
                            _this.removeClass("btn-success").addClass("btn-warning");
                            _this.data("status",data.result.tc_status);
                            // _this.attr("data-status",data.result.tc_status);

                        }else{
                            _this.html("启 用");
                            _this.removeClass("btn-warning").addClass("btn-success");
                            _this.data("status",data.result.tc_status);
                            // _this.attr("data-status",data.result.tc_status);
                        }
                    }
                }
            })

        })
        

    })


})
define(['jquery','form'],function($){
    $(function(){
        $("#create-btn").click(function(){
            $("form").ajaxSubmit({
                url:"/api/course/create",
                type:"post",
                success:function(data){
                    if(data.code == 200){
                        console.log(data);
                        location.href="/course/basic?cs_id="+data.result.cs_id;
                    }
                }
            })
            return false;
        })


    })

})